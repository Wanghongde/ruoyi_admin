import router from '@/router/index'
import { getToken } from '@/utlis/auth'
import store from '@/store/index'
import { Message } from 'element-ui'

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  if(getToken()) {
    if(to.path === '/login') {
      next('/')
    } else {
      if(store.getters.roles.length === 0) {
        try {
          await store.dispatch('getUser')

          const accessRoutes = await store.dispatch('GenrateRoutes')
          router.addRoutes(accessRoutes)
          next({...to})
        } catch(e) {
          await store.dispatch('logOut')
          Message.error(e)
          next('/login')
        }
      } else {
        next()
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
