import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 设置别名为 "src" 目录
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        // additionalData: `@import "@/styles/globe.scss";`
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      }
    }
  }
})
