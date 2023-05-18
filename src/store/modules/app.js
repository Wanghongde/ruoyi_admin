const app = {
  state: {
    isActive: false
  },
  mutations: {
    toggleSideBar(state) {
      state.isActive = !state.isActive
    }
  }
}

export default app
