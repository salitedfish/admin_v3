import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useBoolean } from '@/composables';

export const useSetupStore = defineStore('setup-store', () => {
  const { bool: visible, setTrue: show, setFalse: hide } = useBoolean();

  interface Config {
    name: string;
  }

  const config = reactive<Config>({ name: 'config' });

  /** 设置配置 */
  function setConfig(conf: Partial<Config>) {
    Object.assign(config, conf);
  }

  return {
    visible,
    show,
    hide,
    config,
    setConfig
  };
});
