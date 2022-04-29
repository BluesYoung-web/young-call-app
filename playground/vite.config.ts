/*
 * @Author: zhangyang
 * @Date: 2022-04-29 10:44:37
 * @LastEditTime: 2022-04-29 12:14:55
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'young-call-app': resolve(__dirname, '../src/index.ts')
    }
  }
})
