import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsconfigPaths()],
})
// Config test e2e

// test: {
//   environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
// },
