const tagsView = {
  state: {
    visitedViews: []
  },
  mutations: {
    addVistedView(state, view) {
      if( state.visitedViews.some(item=> item.path === view.path) ) {
        return
      }
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      }))
    },
    delVistedView(state, view) {
      state.visitedViews.some((item, index) => {
        if(item.path === view.path) {
          state.visitedViews.splice(index, 1)

          return true
        }
      })
    }
  },
  actions: {
    addView({commit}, view) {
      commit('addVistedView', view)
    },
    delView({commit}, view) {
      commit('delVistedView', view)
    }
  }
}

export default tagsView
