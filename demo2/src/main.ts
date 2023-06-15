import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const gapp = createApp(App)
gapp.use(ElementPlus)
gapp.mount('#app')
