import type { ProxyOptions } from 'vite';

type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig[]>;

/** 不同环境下的代理配置 */
const serviceEnv: ServiceEnv = {
  dev: [
    {
      proxyPattern: '/proxy-pattern',
      url: 'http://localhost:8080'
    }
  ],
  test: [
    {
      proxyPattern: '/proxy-pattern',
      url: 'http://localhost:8080'
    }
  ],
  prod: [
    {
      proxyPattern: '/proxy-pattern',
      url: 'http://localhost:8080'
    }
  ]
};

/**
 * 获取指定环境下的代理配置
 * @param env
 * @returns
 */
function getServiceEnvConfig(env: ImportMetaEnv): ServiceEnvConfig[] {
  const { VITE_SERVICE_ENV = 'dev' } = env;

  return serviceEnv[VITE_SERVICE_ENV];
}

/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param envConfigs - env环境配置
 */
export function createViteProxy(isOpenProxy: boolean, env: ImportMetaEnv) {
  const envConfigs = getServiceEnvConfig(env);

  if (!isOpenProxy) return undefined;

  const proxy: Record<string, ProxyOptions> = {};

  for (const item of envConfigs) {
    proxy[item.proxyPattern] = {
      target: item.url,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${item.proxyPattern}`), '')
    };
  }

  return proxy;
}
