# 浏览器唤端

目前只实现了基于 `window.location.href` 的唤端

## 环境

```bash
node: 16.13.1
pnpm: 6.26.1
```

## 开发

```bash
# 基于 vitest 的 TDD
pnpm dev
# 执行单元测试
pnpm test

# tsup 监听模式打包(修改代码立即打包)
pnpm build:dev
```

## 打包

```bash
# 打 umd 的包，供浏览器直接使用(基于 vite/rollup)
pnpm build:browser
# 打 esm 和 cjs 的包，供工程化引入使用(基于 tsup)
pnpm build
```

## 使用
