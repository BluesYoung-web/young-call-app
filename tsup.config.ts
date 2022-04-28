/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:55
 * @LastEditTime: 2022-04-28 18:55:33
 * @Description: 
 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: !options.watch,
    minify: !options.watch,
    clean: true,
    dts: true,
    format: ['esm', 'cjs'],
    target: 'es5',
    bundle: true
  };
});