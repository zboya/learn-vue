import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'                   // 增加此行代码

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  resolve: {                              // 增加此行代码
    alias: {                              // 增加此行代码
      '@': path.resolve(__dirname, 'src'),// 增加此行代码
    },                                    // 增加此行代码
  },                                      // 增加此行代码
})
