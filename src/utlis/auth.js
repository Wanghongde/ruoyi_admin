import Cookies from "js-cookie"

const TokenKey = 'Admin-Token'

export const setToken = (key, token) => {
  Cookies.set(key || TokenKey, token)
}

export const getToken = (key) => {
  Cookies.get(key || TokenKey)
}

export const removeToken = (key) => {
  Cookies.remove(key || TokenKey)
}
