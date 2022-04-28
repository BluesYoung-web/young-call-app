/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:27:49
 * @LastEditTime: 2022-04-28 18:36:36
 * @Description: 
 */
/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'YoungCallApp',
      fileName: (format) => `young-call-app.${format}.js`
    },
    rollupOptions: {
      output: {
        format: 'umd'
      }
    },
    outDir: 'dist-browser'
  },
  test: {
    environment: 'happy-dom'
  }
})