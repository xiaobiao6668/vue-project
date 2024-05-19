import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'BasicLayout',
            component: BasicLayout,
            redirect: '/login',
            children: [
                {
                    path: '/cellSplit',
                    name: 'cellSplit',
                    component: () => import('../views/Index/cellSplit.vue'),
                    meta: {
                        title: '细胞分割'
                    }
                },
                {
                    path: '/cellTest',
                    name: 'cellTest',
                    component: () => import('../views/Index/cellTest.vue'),
                    meta: {
                        title: '细胞检测'
                    }
                },
                {
                    path: '/comments',
                    name: 'comments',
                    component: () => import('../views/Index/comments.vue'),
                    meta: {
                        title: '反馈'
                    }
                },
                {
                    path: '/history',
                    name: 'history',
                    component: () => import('../views/Index/history.vue'),
                    meta: {
                        title: '历史'
                    }
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('../views/Index/profile.vue'),
                    meta: {
                        title: '个人中心'
                    }
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('../views/Index/users.vue'),
                    meta: {
                        title: '用户信息'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue')
        },
        {
            path: '/403',
            name: '403',
            component: () => import('../views/error-pages/Page403.vue')
        },
        {
            path: '/500',
            name: '500',
            component: () => import('../views/error-pages/Page500.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('../views/error-pages/Page404.vue')
        }
    ]
})

//路由权限拦截
// router.beforeEach((to, from, next) => {
//     const { isLogin, checkAuth, firstMenuPath } = useUserLoginStore()
//     if (!isLogin && to.path !== '/login') {
//         sessionStorage.clear()
//         localStorage.clear()
//         next({ path: '/login' })
//     } else if (to.path == '/init') {
//         //TODO
//         next(firstMenuPath)
//     } else if (!to.meta.auth || checkAuth(to.meta.auth)) {
//         next()
//     } else {
//         next({ path: '/403' })
//     }
// })

export default router
