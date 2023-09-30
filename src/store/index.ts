import type { App } from 'vue';
import { createPinia } from 'pinia';
import { resetSetupStore } from './plugins';

/** 初始化pinia */
export function setupStore(app: App) {
  const store = createPinia();
  /** 配置store重置化方法 */
  store.use(resetSetupStore);

  app.use(store);
}

export * from './modules';
export * from './subscribe';
