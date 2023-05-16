const app = {
  state: {
    isActive: true
  },
  mutations: {
    toggleSideBar(state) {
      state.isActive = !state.isActive
    }
  }
}

export default app
