import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "../views/home/home-view.vue";
export const routes:  RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: HomeView
    },
    {
      path: '/blog',
      component: () => import('../views/blog/blog-view.vue')
    },
    {
        path: '/archives',
        component: () => import('../views/archives/archives-view.vue')
    },
    {
        path: '/categories',
        component: () => import('../views/categories/categories-view.vue')
    },
    {
        path: '/tags',
        component: () => import('../views/tags/tags-view.vue')
    },
    {
        path: '/idols',
        component: () => import('../views/idols/idols-view.vue')
    },
    {
        path: '/menu',
        component: () => import('../views/menu/menu-view.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('../views/404/NOTFOUND.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes: routes
})
