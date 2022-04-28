/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:45:12
 * @LastEditTime: 2022-04-28 19:04:56
 * @Description: 
 */
import { describe, it, expect } from 'vitest';

import YoungCallApp from '../src/index';

describe('基础使用', () => {
  it('init', () => {
    const callApp = new YoungCallApp({
      android_shceme: 'com.zc.cocos.newgame2021',
      ios_shceme: 'com.2021.ddz',
      download: {
        ios: 'https://apps.apple.com/cn/app/%E8%B5%96%E5%AD%90%E6%96%97%E5%9C%B0%E4%B8%BB-%E5%9B%BD%E6%BD%AE%E6%96%B0%E7%8E%A9%E6%B3%95/id1571085398'
      },
      params: {
        apkId: '111',
        userId: '402527',
        extra: 'fdjshrklytiuryb555555'
      },
      landpage: 'https://intranet-2021-dev-share.laiyouxi.com/share'
    });

    expect(callApp).toMatchInlineSnapshot(`
      YoungCallApp {
        "download": "https://intranet-2021-dev-share.laiyouxi.com/share",
        "info": "(复制此消息打开app)|apkId=111&userId=402527&extra=fdjshrklytiuryb555555",
        "options": {
          "callFail": [Function],
          "mask": {
            "wechat": [Function],
          },
          "startCall": [Function],
          "timeout": 2500,
        },
        "scheme": "com.zc.cocos.newgame2021://?apkId=111&userId=402527&extra=fdjshrklytiuryb555555",
      }
    `)
  })
})