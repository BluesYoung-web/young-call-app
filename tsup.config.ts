/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:55
 * @LastEditTime: 2022-04-29 10:41:47
 * @Description: 
 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: !options.watch,
    minify: !options.watch,
    clean: !!options.watch,
    dts: true,
    format: ['esm', 'cjs'],
    target: 'es5',
    bundle: true
  };
});