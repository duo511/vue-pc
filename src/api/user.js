import http from '@/utils/request.js'
import { getUser } from '@/api/storage.js'

/**
 * 登录请求
 */
export const reqUserLogin = (mobile, code) => {
  return http({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户身份信息
 */
export const reqGetUserInfo = () => {
  const userInfo = getUser()
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  })
}
