import { createApp } from 'vue'
//引入模板的全局的样式
import '@/styles/index.scss'
import App from './App.vue'
// 引用element-plus和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入svg插件配置代码
import 'virtual:svg-icons-register'
// 导入全局组件
import globalComponents from './components'
import router from './router'
// 获取应用实例对象
const app = createApp(App)
app.use(ElementPlus)
app.use(globalComponents)
app.use(router)
app.mount('#app')
