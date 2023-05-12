import { login } from '@/api/user'
import { Message } from 'element-ui'
import { setToken } from '@/utlis/auth'

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
          const { data } = await login(form)

          Message.success(data.msg)

          setToken(data.token)
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
