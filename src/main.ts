import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './styles/globe.scss'
import IconFontVue from './components/IconFont.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'animate.css';

createApp(App)
.use(router)
.use(ElementPlus)
.component('IconFont',IconFontVue)
.mount('#app')
