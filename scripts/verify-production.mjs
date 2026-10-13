import { spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
const port = process.env.AUDIT_PORT || '3101'
const secret = randomBytes(32).toString('hex')
const env = { ...process.env, NEXT_DIST_DIR: '.next-audit', SANITY_REVALIDATE_SECRET: secret }
function run(command, args, childEnv = env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { env: childEnv, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)))
  })
}
await run(process.execPath, ['node_modules/next/dist/bin/next', 'build'])
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', port], { env, stdio: 'inherit' })
let stopped = false
server.on('exit', () => { stopped = true })
try {
  const origin = `http://127.0.0.1:${port}`
  let ready = false
  for (let i = 0; i < 40 && !stopped; i++) {
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(2000) })
      if (response.ok) { ready = true; break }
    } catch { /* wait for listener */ }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  if (!ready) throw new Error('Production preview did not become ready')
  await run(process.execPath, ['node_modules/@playwright/test/cli.js', 'test'], { ...env, TEST_BASE_URL: origin, TEST_WEBHOOK_SECRET: secret })
  await run(process.execPath, ['scripts/check-client-secrets.mjs'])
} finally {
  if (!stopped) server.kill('SIGTERM')
}
