import { defineStore } from 'pinia';
import { constantRoutes, router, routes as staticRoutes } from '@/router';
// import { fetchUserRoutes } from '@/service';
import {
  // localStg,
  filterAuthRoutesByUserPermission,
  getCacheRoutes,
  getConstantRouteNames,
  transformAuthRouteToVueRoutes,
  transformAuthRouteToMenu,
  transformAuthRouteToSearchMenus,
  transformRoutePathToRouteName
  // sortRoutes
} from '@/utils';
import { useAppStore } from '../app';
import { useAuthStore } from '../auth';
import { useTabStore } from '../tab';

interface RouteState {
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页name(前端静态路由时生效) */
  routeHomeName: AuthRoute.AllRouteKey;
  /** 菜单 */
  menus: App.GlobalMenuOption[];
  /** 搜索的菜单 */
  searchMenus: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    searchMenus: [],
    cacheRoutes: []
  }),
  actions: {
    /** 重置路由的store */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes();
      routes.forEach(route => {
        const name = (route.name || 'root') as AuthRoute.AllRouteKey;
        if (!this.isConstantRoute(name)) {
          router.removeRoute(name);
        }
      });
    },
    /**
     * 是否是固定路由
     * @param name 路由名称
     */
    isConstantRoute(name: AuthRoute.AllRouteKey) {
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name);
    },
    /**
     * 是否是有效的固定路由
     * @param name 路由名称
     */
    isValidConstantRoute(name: AuthRoute.AllRouteKey) {
      const NOT_FOUND_PAGE_NAME: AuthRoute.NotFoundRouteKey = 'not-found';
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME;
    },
    /** 初始化静态路由 */
    async initStaticRoute() {
      const { initHomeTab } = useTabStore();
      const auth = useAuthStore();

      // 根据用户所具有哪些路由过滤路由
      const routes = filterAuthRoutesByUserPermission(staticRoutes, auth.userInfo.userRouts);
      // 将过滤好的路由转化为菜单
      (this.menus as App.GlobalMenuOption[]) = transformAuthRouteToMenu(routes);
      // 将过滤好的路由转化为搜索菜单
      this.searchMenus = transformAuthRouteToSearchMenus(routes);
      // 将过滤好的路由转化为vue路由
      const vueRoutes = transformAuthRouteToVueRoutes(routes);
      vueRoutes.forEach(route => {
        router.addRoute(route);
      });
      // 获取缓存路由
      this.cacheRoutes = getCacheRoutes(vueRoutes);

      initHomeTab(this.routeHomeName, router);

      this.isInitAuthRoute = true;
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      await this.initStaticRoute();
    },
    /** 从缓存路由中去除某个路由 */
    removeCacheRoute(name: AuthRoute.AllRouteKey) {
      const index = this.cacheRoutes.indexOf(name);
      if (index > -1) {
        this.cacheRoutes.splice(index, 1);
      }
    },
    /** 添加某个缓存路由 */
    addCacheRoute(name: AuthRoute.AllRouteKey) {
      const index = this.cacheRoutes.indexOf(name);
      if (index === -1) {
        this.cacheRoutes.push(name);
      }
    },
    /**
     * 重新缓存路由
     */
    async reCacheRoute(name: AuthRoute.AllRouteKey) {
      const { reloadPage } = useAppStore();

      const isCached = this.cacheRoutes.includes(name);

      if (isCached) {
        this.removeCacheRoute(name);
      }

      await reloadPage();

      if (isCached) {
        this.addCacheRoute(name as AuthRoute.AllRouteKey);
      }
    }
  }
});
