// // import type { AxiosRequestConfig } from 'axios';
// import type { RequestNecessity } from '@ultra-man/noa';
// import { useAuthStore } from '@/store';
// import { localStg } from '@/utils';
// import { fetchUpdateToken } from '../api';
// import { ultraFetch } from './index';

// /**
//  * 刷新token
//  * @param axiosConfig - token失效时的请求配置
//  */
// export const handleRefreshToken = async (requestNecessity: RequestNecessity) => {
//   const { resetAuthStore } = useAuthStore();
//   const refreshToken = localStg.get('refreshToken') || '';
//   const { data } = await fetchUpdateToken(refreshToken);
//   if (data) {
//     localStg.set('token', data.token);
//     localStg.set('refreshToken', data.refreshToken);

//     requestNecessity.cusConfig.headers.Authorization = data.token;
//     return requestNecessity;
//   }

//   resetAuthStore();
//   return null;
// };

// /**
//  * 刷新token并再次请求
//  * @param requestNecessity
//  */
// export const handleRefresh = async (requestNecessity: RequestNecessity) => {
//   const config = await handleRefreshToken(requestNecessity);
//   if (config) {
//     const res = await ultraFetch.request(config);
//     return res;
//   }
//   return null;
// };
