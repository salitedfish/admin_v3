/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户所具有的路由
   */
  type UserRoutes = AuthRoute.AllRouteKey[];

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户所具有的路由 */
    userRouts: UserRoutes;
  }
}
