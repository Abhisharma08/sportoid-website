import nextEnv from '@next/env'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
nextEnv.loadEnvConfig(process.cwd())
const secrets = ['SANITY_API_WRITE_TOKEN', 'SANITY_API_READ_TOKEN', 'SANITY_REVALIDATE_SECRET', 'FORM_ID_SECRET'].map((key) => process.env[key]).filter((value) => value && value.length > 8)
const root = path.join(process.env.NEXT_DIST_DIR || '.next', 'static')
let checked = 0
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) await scan(file)
    else if (/\.(js|map)$/.test(file)) {
      checked++
      const source = await readFile(file, 'utf8')
      if (secrets.some((secret) => source.includes(secret))) throw new Error('A server credential was found in browser output. Do not deploy.')
    }
  }
}
await scan(root)
console.log(`Checked ${checked} browser files: no configured server credentials found.`)
