import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './styles/globe.scss'
import IconFontVue from './components/IconFont.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'animate.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme  from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
});

createApp(App)
.use(router)
// .use(ElementPlus)
.use(VMdPreview)
.component('IconFont',IconFontVue)
.mount('#app')
