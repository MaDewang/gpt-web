import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/index.vue'


const routes = [
    { path: '/', component: Layout, redirect: '/chat', children: [
      { path: '/chat', component: () => import('../views/chat/index.vue') }
    ] }
  ]

  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

    export default router