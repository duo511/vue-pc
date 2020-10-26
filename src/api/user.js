import http from '@/utils/request.js'
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
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}

/**
 * 修改用户资料
 * @param {*} data
 */
export const reqModUserInfo = (data) => {
  return http({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data: data
  })
}

export const reqModUserImage = formData => {
  return http({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data: formData
  })
}
