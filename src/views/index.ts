import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  'multi-menu_first_second-new_third-new': () => import('./multi-menu/first/second-new/third-new/index.vue'),
  'multi-menu_first_second-new_third': () => import('./multi-menu/first/second-new/third/index.vue'),
  'multi-menu_first_second': () => import('./multi-menu/first/second/index.vue')
};
