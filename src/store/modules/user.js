import { login } from '@/api/user'

const user = {
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    Login({commit}, form) {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await login(form)

          localStorage.setItem('token', data.token)
          commit('setToken', data.token)
          resolve(data)
        } catch(e) {
          reject(e)
        }
      })

    }
  }
}

export default user
