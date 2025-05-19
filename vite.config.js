import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    server: {
      host: true
    },
    plugins: [
      ViteImageOptimizer(),
      viteStaticCopy({
        targets: [
          {
            src: 'service-worker.js',
            dest: '.'
          },
        ]
      })
    ],
  }
})
