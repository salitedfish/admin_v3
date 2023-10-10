/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(routes: AuthRoute.Route[], userRouts: Auth.UserRoutes) {
  return routes.map(route => filterAuthRouteByUserPermission(route, userRouts)).flat(1);
}

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param permission - 权限
 */
function filterAuthRouteByUserPermission(route: AuthRoute.Route, userRouts: Auth.UserRoutes): AuthRoute.Route[] {
  const filterRoute = { ...route };
  // 如果此路由meta里面requireAuth为false，或者用户拥有的路由包括此路由名称
  const hasPermission = !route.meta.requiresAuth || userRouts.includes(route.name);

  if (filterRoute.children) {
    const filterChildren = filterRoute.children.map(item => filterAuthRouteByUserPermission(item, userRouts)).flat(1);
    Object.assign(filterRoute, { children: filterChildren });
  }
  return hasPermission ? [filterRoute] : [];
}
