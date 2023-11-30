import {defineConfig, loadEnv} from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import path from "path"
import mockDevServerPlugin from "vite-plugin-mock-dev-server"

// https://vitejs.dev/config/



export default defineConfig(({mode}) => {
  let resolve = (dir: string) => {
    return path.join(__dirname, dir)
  }

  let env = loadEnv(mode, process.cwd())

  let globalVar =  ""

  if (process.env.UNI_PLATFORM === "h5") {
    globalVar = '$staticDomain: "' + env.VITE_APP_STATIC_HTTP + '";$version: "'+env.VITE_APP_VERSION+'";@import "./src/common/scss/import.scss";'
  }else if (process.env.UNI_PLATFORM === "mp-weixin") {
    globalVar = '$staticDomain: "' + env.VITE_APP_STATIC_HTTPS + '";$version: "'+env.VITE_APP_VERSION+'";@import "./src/common/scss/import.scss";'
  }

  return {
    plugins: [uni(), mockDevServerPlugin()],
    base:'./',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: globalVar,
          javascriptEnabled: true
        }
      },
    },
    resolve: {
      alias: {
        '@icon': resolve('./src/static/icon'),
        '@images': resolve('./src/static/images'),
        '@static': resolve('./src/static'),
      }
    },
    transpileDependencies: ['@dcloudio/uni-ui'],
    server: {
      proxy: {
        '^/api': {
          target: env.VITE_APP_API_BASE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
});