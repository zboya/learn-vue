import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引用element-plus和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 获取应用实例对象
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
