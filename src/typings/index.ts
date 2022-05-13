/**
 * 唤端配置
 */
export type Config = {
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
  download?: {
    /**
    * 安卓
    */
    android?: string;
    /**
    * ios
    */
    ios: string;
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
  landpage: string;
};

type Cbk = () => void;

/**
 * 可选配置
 */
export interface Options {
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