import '@cool-midway/core';

declare module '@cool-midway/core' {
  interface CurdOption {
    /**
     * RPC 配置 - 用于自动调用远程微服务
     */
    rpc?: {
      /** RPC 服务名称 */
      serviceName: string;
      /** RPC 控制器名称 */
      controllerName: string;
    };
  }
}
