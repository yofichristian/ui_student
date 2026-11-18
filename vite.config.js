import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import path from "path";

// const projectRootDir = resolve(__dirname);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    // alias({
    //   entries: [
    //     {
    //       find: '@',
    //       replacement: resolve(projectRootDir, 'src')
    //     }
    //   ]
    // })
  ],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9190,
  },
  base: './',
  // base: '/excel',
  // root: 'src',
  build: {
    // outDir: 'D:/nginx/html/excel',
    // outDir: 'dist',
    outDir: '../html',
    emptyOutDir: true,
    chunkSizeWarningLimit: 10000,
  },
})
