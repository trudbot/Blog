import {createWebHistory, RouteRecordRaw, createRouter} from "vue-router";
import HomeView from "../views/home/home-view.vue";
import templates from './404-templates'

const templateNames = templates.map(template => template.name)

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
        path: '/friends',
        component: () => import('../views/friends/friends-view.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404/NOTFOUND.vue')
    },
    ...templates,
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        beforeEnter: () => {
            const templateName = templateNames[Math.floor(Math.random() * templateNames.length)]
            console.log(templateName);
            return {
                name: templateName
            }
        },
        component: () => import('../views/404/NOTFOUND.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes: routes
})
