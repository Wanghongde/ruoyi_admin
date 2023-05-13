import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utlis/auth'
import store from '@/store/index'

const isRelogin = { flag: false }

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 3000
})

instance.interceptors.request.use(config => {
  const { headers } = config

  const token = getToken()

  if(token && !headers.noToken) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, err => {
  Message.error('请求失败')
})

instance.interceptors.response.use(async res => {
  const {data, headers} = res

  if(data.code === 401) {
    if(!isRelogin.flag) {
      try {
        isRelogin.flag = true

        await MessageBox.$confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
        isRelogin.flag = false

        await store.dispatch('logOut')
        location.href = '/index'
      } catch(e) {
        isRelogin.flag = false
      }
    }
    return Promise.reject(data.msg)
  } else if(data.code === 500) {
    Message.error(data.msg)
    return Promise.reject(data.msg)
  }

  return res
}, err => {
  let { message } = err

  if(message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if(message.includes('Request failed with status code')) {
    message = `系统接口 ${message.substr(message.length - 3)} 异常`
  }

  Message.error(message)
})

export default instance
