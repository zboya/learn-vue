import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const publicRouters: RouteRecordRaw[] = [
    // {
    //     path: '/',
    //     component: () => import('@/layout/index.vue'),
    //     redirect: '/home',

    //     children: [
    //         {
    //             path: '/home',
    //             name: 'home',
    //             component: () => import('@/views/home/home.vue'),
    //             meta: { title: '首页', icon: 'shouye', affix: true, sort: '99.99' },
    //         },
    //     ],
    //     meta: {
    //         sort: '99',
    //     },
    // },
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            hidden: '1',
        },
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRouters,
})

export default router

// 作者：十里青山
// 链接：https://juejin.cn/post/7224145268739604539
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。