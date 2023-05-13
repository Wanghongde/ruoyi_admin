import request from '@/utlis/request'

export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export const getCodeImg = () => {
  return request({
    url: '/captchaImage',
    method: 'GET'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/getInfo',
    method: 'GET'
  })
}
