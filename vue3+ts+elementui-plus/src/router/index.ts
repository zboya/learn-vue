import { createRouter, createWebHashHistory } from 'vue-router'

let router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            name: 'login'
        },
        {
            path: '/',
            component: () => import('@/views/home/index.vue'),
            name: 'home'
        },
        {
            path: '/404',
            component: () => import('@/views/404/index.vue'),
            name: '404'
        },


        // demo
        {
            path: '/layout',
            component: () => import('@/demo/layout.vue'),
            name: 'demo'
        }
    ],
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})

export default router