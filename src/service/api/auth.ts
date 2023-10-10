import { ultraFetch } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return ultraFetch.post<Api.Return<boolean>>({
    URL: '/getSmsCode',
    body: JSON.stringify({ phone })
  });
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName: string, password: string) {
  return ultraFetch.post<Api.Return<ApiAuth.Token>>({
    URL: '/login',
    body: JSON.stringify({ userName, password })
  });
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return ultraFetch.get<Api.Return<ApiAuth.UserInfo>>({
    URL: '/getUserInfo'
  });
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return ultraFetch.post<Api.Return<ApiAuth.Token>>({
    URL: '/updateToken',
    body: JSON.stringify({ refreshToken })
  });
}
