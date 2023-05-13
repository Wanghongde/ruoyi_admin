import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '../views/login/login.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: "index" */ '@/layout/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "user" */ '../views/404/404.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
