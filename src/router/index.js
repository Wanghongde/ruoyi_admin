import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import(/* webpackChunkName: "user" */ '../views/login/login.vue')
  },
  {
    path: '',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes: constRoutes
})

export default router
