import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    proxy:{
      '/api': {       // 获取路径中包含了 /api 的请求
        target: 'http://localhost:8080',    // 后台服务的地址
        changeOrigin: true,       // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '')  // 将路径中的 /api 替换为空字符串
      }
    }
  }
})
