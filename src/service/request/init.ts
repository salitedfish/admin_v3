import { UltraFetch, useGetLStorage } from '@ultra-man/noa';
import { useRouterPush } from '@/composables';
import { getServiceEnvConfig } from '~/.env-config';

export enum RequestCodeState {
  SUCCESS = 0,
  ERROR = -1,
  LOGGED_IN_EXPIRED = 301,
  NOT_LOGGED_IN = 302,
  ACCOUNT_FROZEN = 303
}

const { proxyPattern } = getServiceEnvConfig(import.meta.env);
const routerPush = useRouterPush();

export const ultraFetch = new UltraFetch(
  {
    baseURL: proxyPattern,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  },
  {
    reqHandler: config => {
      config.headers = { ...config.headers, ...{ authentication: useGetLStorage('token')('') as string } };

      return config;
    },
    resHandler: response => {
      if (!response) {
        routerPush.toLogin();
        window.$notification?.info({
          title: '123'
        });
        // commonNotify('error', '网络异常！');
      } else if (response.code === RequestCodeState.SUCCESS) {
        return response;
      } else if (response.code === RequestCodeState.ERROR) {
        // commonNotify('warning', message || '网络异常！');
      } else {
        // commonNotify('warning', message || '网络异常！');
      }

      return response;
    },
    errHandler: () => {
      // commonNotify('error', '未知异常，可尝试刷新页面！');
    }
  }
);
