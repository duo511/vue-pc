const KEY = 'userInfo'

/**
 * 保存用户信息到本地
 */
export const setUser = user => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

/**
 * 从本地取出用户信息
 */
export const getUser = () => {
  return JSON.parse(localStorage.getItem(KEY))
}
