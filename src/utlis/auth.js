import Cookies from "js-cookie"

const TokenKey = 'Admin-Token'

export const setToken = (token, key) => {
  Cookies.set(key || TokenKey, token)
}

export const getToken = (key) => {
  return Cookies.get(key || TokenKey)
}

export const removeToken = (key) => {
  Cookies.remove(key || TokenKey)
}
