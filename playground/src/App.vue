<!--
 * @Author: zhangyang
 * @Date: 2022-04-29 10:44:37
 * @LastEditTime: 2022-04-29 12:00:48
 * @Description: 
-->
<script setup lang="ts">
import YoungCallApp from 'young-call-app';

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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
