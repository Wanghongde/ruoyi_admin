import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 3000
})

instance.interceptors.response.use(res => {
  const {data, headers} = res

  if(data.code === 500) {
    Message.error(data.msg)
    return Promise.reject(data.msg)
  }

  return res
})

export default instance
