import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  workers: 2,
  use: { baseURL: process.env.TEST_BASE_URL || 'http://localhost:3100', browserName: 'chromium', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  reporter: 'list',
})
