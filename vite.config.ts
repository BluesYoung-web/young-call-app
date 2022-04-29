/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:27:49
 * @LastEditTime: 2022-04-29 10:42:02
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
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      output: {
        format: 'umd'
      }
    },
  },
  test: {
    environment: 'happy-dom'
  }
})