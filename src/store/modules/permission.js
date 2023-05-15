import { getRouters } from '@/api/menu'
import { constRoutes } from '@/router'
import Layout from '@/layout'

function loadView (view) {
  const res = (resolve) => {
    return require([`@/views/${view}`], resolve)
  }
  return res
}

function filterAsyncRouter(asyncRouter) {
  return asyncRouter.filter(route => {
    if(route.component) {
      if(route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }

    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }

    return true
  })
}

const permission = {
  state: {
    sidebarRouters: []
  },
  mutations: {
    setSidebarRouters(state, router) {
      state.sidebarRouters = router
    }
  },
  actions: {
    GenrateRoutes({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const {data: {data}} = await getRouters()

          const resData = filterAsyncRouter(JSON.parse(JSON.stringify(data)))
          const rewriteData = filterAsyncRouter(JSON.parse(JSON.stringify(data)))

          let res = constRoutes.concat(resData)
          commit('setSidebarRouters', res)

          resolve(rewriteData)
        } catch(e) {
          reject(e)
        }

      })
    }
  }
}

export default permission
