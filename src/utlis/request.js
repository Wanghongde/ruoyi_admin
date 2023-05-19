import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utlis/auth'
import { transParams } from '@/utlis/tools'
import store from '@/store/index'

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

  if (config.method.toLowerCase() === 'get' && config.params) {
    let url = config.url + '?' + transParams(config.params)

    url = url.slice(0, -1)

    config.params = {}

    config.url = url
  }

  return config
}, err => {
  Message.error('请求失败')
})

instance.interceptors.response.use(res => {
  const {data, headers} = res

  if(data.code === 401) {
    MessageBox.confirm('登录状态已过期，请重新登录', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('logOut').then(() => {
        location.href = '/'
      })
    }).catch(() => {
    })
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
