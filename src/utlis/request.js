import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 10000
})

export default instance
