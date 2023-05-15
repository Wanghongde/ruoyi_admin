import { getRouters } from '@/api/menu'

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

          commit('setSidebarRouters', data)
          resolve(data)
        } catch(e) {
          reject(e)
        }

      })
    }
  }
}

export default permission
