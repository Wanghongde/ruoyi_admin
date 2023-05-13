import router from '@/router/index'
import { getToken } from '@/utlis/auth'
import store from '@/store/index'

const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  if(getToken()) {
    if(to.path === '/login') {
      next('/')
    } else {
      if(store.getters.roles.length === 0) {
        store.dispatch('getUser').then(res=> {
          next()
        }).catch(e => {
          next()
        })
      }
    }
  } else {
    if(whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
