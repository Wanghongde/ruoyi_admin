import { login, getUserInfo, logout } from '@/api/user'
import { Message } from 'element-ui'
import { removeToken, setToken } from '@/utlis/auth'

const user = {
  state: {
    token: '',
    roles: [],
    permissions: '',
    name: '',
    avatar: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setName(state, name) {
      state.name = name
    },
    setAvatar(state, avatar) {
      state.avatar = name
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
    },
    getUser({commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data: {permissions, roles, user} } = await getUserInfo()
          const avatar = user.avatar ? '' + user.avatar : require('@/assets/user_avatar.jpeg')

          if(roles && roles.length) {
            commit('setRoles', roles)
            commit('setPermissions', permissions)
          } else {
            commit('setRoles', roles)
          }

          commit('setName', user.username)
          commit('setAvatar', avatar)

          resolve(user)
        } catch(e) {
          reject(e)
        }
      })
    },
    logOut({commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await logout()

          commit('setRoles', '')
          commit('setPermissions', '')
          commit('setName', '')
          commit('setAvatar', '')
          removeToken()

          resolve(data)
        } catch(e) {
          reject(e)
        }
      })
    }
  }
}

export default user
