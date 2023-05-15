import request from '@/utlis/request'

export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'GET'
  })
}
