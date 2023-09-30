import type { RouteComponent } from 'vue-router';
import { BasicLayout, BlankLayout } from '@/layouts';
import { views } from '@/views';
import { isFunction } from '../common';

type Lazy<T> = () => Promise<T>;

interface ModuleComponent {
  default: RouteComponent;
}

type LayoutComponent = Record<UnionKey.LayoutComponentType, Lazy<ModuleComponent>>;

/**
 * 获取布局的vue文件(懒加载的方式)，生成路由时，根据component字段获取对应组件
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: UnionKey.LayoutComponentType) {
  const layoutComponent: LayoutComponent = {
    // 主界面的基础组件
    basic: BasicLayout,
    // 单独一个界面的组件
    blank: BlankLayout
  };
  return layoutComponent[layoutType];
}

/**
 * 获取页面导入的vue文件，生成路由时，如果component字段为self，说明都是包含于主界面里面的子组件，根据name字段获取
 * @param routeKey - 路由key
 */
export function getViewComponent(routeKey: AuthRoute.LastDegreeRouteKey) {
  if (!views[routeKey]) {
    throw new Error(`路由“${routeKey}”没有对应的组件文件！`);
  }
  return setViewComponentName(views[routeKey], routeKey);
}

/** 给页面组件设置名称 */
function setViewComponentName(component: RouteComponent | Lazy<ModuleComponent>, name: string) {
  if (isAsyncComponent(component)) {
    return async () => {
      const result = await component();
      Object.assign(result.default, { name });
      return result;
    };
  }

  Object.assign(component, { name });

  return component;
}

function isAsyncComponent(component: RouteComponent | Lazy<ModuleComponent>): component is Lazy<ModuleComponent> {
  return isFunction(component);
}
