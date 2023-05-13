import request from '@/utlis/request'

export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    headers: {
      noToken: true
    },
    data
  })
}

export const getCodeImg = () => {
  return request({
    url: '/captchaImage',
    headers: {
      noToken: true
    },
    method: 'GET'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/getInfo',
    method: 'GET'
  })
}

export const logout = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}
