import { UltraFetch } from '@ultra-man/noa';
import { useRouterPush } from '@/composables';
import { localStg } from '@/utils';
import { RequestCodeState } from '@/enum/api';
// import { getServiceEnvConfig } from '~/.env-config';

// const { proxyPattern } = getServiceEnvConfig(import.meta.env);

const routerPush = useRouterPush(false);

export const ultraFetch = new UltraFetch(
  /**
   * 请求配置
   */
  {
    // baseURL: proxyPattern,
    baseURL: '/mock',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  },
  {
    /**
     * 请求拦截器
     * @param config
     * @returns
     */
    reqHandler: config => {
      config.headers = { ...config.headers, ...{ Authorization: localStg.get('token') || '' } };

      return config;
    },
    /**
     * 响应拦截器
     * @param response
     * @returns
     */
    resHandler: async response => {
      if (!response) {
        routerPush.toLogin();
        window.$notification?.error({
          title: '未知异常，可尝试刷新页面重试'
        });
      } else if (response.code === RequestCodeState.SUCCESS) {
        return response;
      }

      return response;
    },
    /**
     *错误拦截器
     */
    errHandler: () => {
      window.$notification?.error({
        title: '未知异常，可尝试刷新页面重试'
      });
    }
  }
);
