/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:04
 * @LastEditTime: 2022-04-28 19:36:32
 * @Description: 
 */
import { copy, detector } from './tools';
/**
 * 唤端配置
 */
interface Config {
  /**
   * 安卓唤端地址
   */
  android_shceme: string;
  /**
   * ios 唤端地址
   */
  ios_shceme: string;
  /**
   * 特定渠道的下载地址
   */
  download: {
    /**
     * 安卓
     */
    android?: string;
    /**
     * ios
     */
    ios?: string;
    /**
     * 应用宝
     */
    yyb?: string;
  };
  /**
   * 唤端路径
   */
  path?: string;
  /**
   * 需要传递的参数
   */
  params?: Record<string, string>;
  /**
   * 兜底的落地页
   */
  landpage?: string;
}
type Cbk = () => void;
/**
 * 可选配置
 */
interface Options {
  /**
   * 超时时间
   * @default 2500 ms
   */
  timeout?: number;
  /**
   * 特殊环境的遮罩
   */
  mask?: {
    wechat?: Cbk;
  },
  startCall?: Cbk;
  callFail?: Cbk;
}

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
      download = conf.download.ios || conf.landpage;
    } else {
      scheme += `${conf.android_shceme}://`;
      download = conf.download.yyb || conf.landpage;
      if (inWeixin && conf.download.yyb) {
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