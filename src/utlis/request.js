import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utlis/auth'

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

instance.interceptors.response.use(res => {
  const {data, headers} = res

  if(data.code === 401) {
    Message.error(data.msg)
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
