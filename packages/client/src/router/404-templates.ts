import {RouteRecordRaw} from "vue-router";

export default [
    {
        path: '/grimace',
        name: 'Grimace',
        component: () => import('../views/404/templates/grimace.vue')
    },
    {
        path: '/hits',
        name: 'Hits',
        component: () => import('../views/404/templates/hits.vue')
    },
    {
        path: '/lantern',
        name: 'Lantern',
        component: () => import('../views/404/templates/lantern.vue')
    },
    {
        path: '/train',
        name: 'Train',
        component: () => import('../views/404/templates/train.vue')
    }
] as RouteRecordRaw[];