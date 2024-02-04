import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import templates from './404-templates';

const templateNames = templates.map(template => template.name)

export const routes:  RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('../views/home/home-view.vue')
    },
    {
      path: '/blog',
      component: () => import('../views/blog/blog-view.vue'),
      children: [
        {
            path: '',
            name: 'BlogList',
            component: () => import('../views/blog/components/blog-list-view.vue')
        },
        {
            path: 'show/:id',
            name: 'BlogShow',
            props: true,
            component: () => import('../views/blog/components/blog-show.vue')
        }
      ]
    },
    {
        path: '/lab',
        component: () => import('../views/lab/lab-view.vue')
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
        path: '/tagDetail/:tag',
        props: true,
        name: "TagDetail",
        component: () => import('../views/tags/tag-detail.vue')
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
