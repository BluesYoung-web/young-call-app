# 浏览器唤端

目前只实现了基于 `window.location.href` 的唤端

## 开发环境

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
# 打 umd 的包，供浏览器直接使用(基于 vite/rollup)
pnpm build:browser
```

## 打包

```bash
# 产出所有格式的包
pnpm build
```

## 使用

[vue demo](./playground/src/App.vue)

### 使用包管理器

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install young-call-app --save

# Yarn
$ yarn add young-call-app

# pnpm
$ pnpm add young-call-app
```

```html
<script setup lang="ts">
import YoungCallApp from 'young-call-app';
/**
 * 极简形态
 */
const callApp = new YoungCallApp({
  android_shceme: 'com.test.app',
  ios_shceme: 'com.test-ios.app',
  download: {
    ios: 'https://apps.apple.com/cn/app/xxx'
  },
  params: {
    key1: '111',
    key2: '222',
    key3: '333'
  },
  landpage: 'https://default.download.com'
});

/**
 * 完全形态
 */
const callApp = new YoungCallApp({
  android_shceme: 'com.test.app',
  ios_shceme: 'com.test-apple.app',
  download: {
    // 以下所有配置可选，若不配置则会使用兜底的落地页
    ios: '此处配置Apple应用商店中的地址',
    android: '此处配置安卓的下载链接',
    yyb: '此处配置应用宝的地址'
  },
  landpage: '兜底的落地页',
  path: 'scheme  的路径部分，可选',
  // 需要携带的参数
  params: {
    key1: 'value1',
    key2: 'value2',
    // ...
  }
}, {
  /* 可选配置 */
  // 唤端时间，默认 2.5 s
  timeout: 2500,
  startCall: () => console.log('---开始唤端---'),
  callFail: () => console.log('---唤端失败---'),
  // 受限环境中的处理函数
  mask: {
    wechat: () => {
      window.alert('目前处于微信内置浏览器中，不会执行常规的唤端操作')
    }
  }
});

const openHandler = () => callApp.call()
</script>

<template>
  <button @click="openHandler">启动APP</button>
</template>
```

### 浏览器直接引入

`<script src="//cdn.jsdelivr.net/npm/jquery"></script>`

`const callApp = new window.YoungCallApp()`
