import request from '@/utlis/request'

export const getRoleList = (params) => {
  return request({
    url: '/system/role/list',
    method: 'GET',
    params
  })
}

export function treeselect () {
  return request({
    url: '/system/menu/treeselect',
    methods: 'GET'
  })
}
