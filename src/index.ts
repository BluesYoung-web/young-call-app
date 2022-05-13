/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:04
 * @LastEditTime: 2022-05-13 11:01:23
 * @Description: 
 */
import { copy, detector } from './tools';
import type { Options, Config } from './typings';

const isIos = detector.os.name === 'ios';
const inWeixin = detector.browser.name === 'micromessenger';
// const inQQ = detector.browser.name === 'qq';
// const inWeibo = detector.browser.name === 'weibo';
// const inBaidu = detector.browser.name === 'baidu';

const defaultOptions: Options = {
  timeout: 2500,
  mask: {
    wechat: () => null
  },
  startCall: () => console.log('---开始唤端---'),
  callFail: () => console.log('---唤起失败，跳转下载---'),
}

class YoungCallApp {
  public scheme: string;
  public download: string;
  public info: string;
  public options: Options;
  constructor(conf: Config, options: Options = {}) {
    this.options = Object.assign(defaultOptions, options);
    this.generateScheme(conf);
  }

  generateScheme(conf: Config) {
    let scheme = '', download = '', info = '(复制此消息打开app)|';
    if (isIos) {
      scheme += `${conf.ios_shceme}://`;
      download = conf?.download.ios || conf.landpage;
    } else {
      scheme += `${conf.android_shceme}://`;
      download = conf?.download?.yyb || conf.landpage;
      if (inWeixin && conf?.download?.yyb) {
        download = conf.download.yyb
      }
    }
    if (conf.path) {
      scheme += conf.path;
    }
    if (conf.params) {
      const query = new URLSearchParams(conf.params).toString();
      scheme += `?${query}`;
      info += query;
    }

    this.scheme = scheme;
    this.download = download;
    this.info = info;
  }

  call() {
    const { mask, startCall } = this.options;
    if (inWeixin && mask.wechat) {
      mask.wechat();
      return;
    }
    this.copyInfo();
    startCall?.();
    // 开始唤端
    window.location.href = this.scheme;
    this.fallback();
  }

  copyInfo() {
    copy(this.info);
  }

  fallback() {
    const t = setTimeout(() => {
      this.options.callFail?.();
      window.location.href = this.download;
    }, this.options.timeout);

    setTimeout(() => {
      window.addEventListener('blur', () => clearTimeout(t));
    }, this.options.timeout - 500);
  }
}

export default YoungCallApp;