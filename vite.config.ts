import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [preact(), tsconfigPaths(), nodePolyfills()],
  base: '/neged-roulette-frontend/',
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as Plugin,
      ],
    },
    outDir: 'dist',
  },
})
