import request from '@/utlis/request'

export const getRoleList = (params) => {
  return request({
    url: '/system/role/list',
    method: 'GET',
    params
  })
}
