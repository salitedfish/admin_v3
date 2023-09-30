import { defineConfig, loadEnv } from 'vite';
import { createViteProxy, getRootPath, getSrcPath, setupVitePlugins } from './build';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';

  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3200,
      open: true,
      proxy: createViteProxy(isOpenProxy, viteEnv)
    },
    optimizeDeps: {
      include: ['@better-scroll/core']
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  };
});
