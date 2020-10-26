import http from '@/utils/request'

/**
 * 获取粉丝列表
 * @param {*} page
 * @param {*} perPage
 */
export const reqGetFans = (page, perPage) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/followers',
    params: {
      page,
      per_page: perPage
    }
  })
}

/**
 * 获取粉丝统计
 */
export const reqGetFansStatistics = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/statistics/followers'
  })
}
