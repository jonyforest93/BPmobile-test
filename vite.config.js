import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    server: {
      host: true
    },
    plugins: [ViteImageOptimizer()],
  }
})
