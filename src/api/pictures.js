import http from '@/utils/request.js'

/**
 * 获取列表素材
 */
export const reqGetImages = (paramObj) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params: paramObj || {}
  })
}
/**
 * 切换收藏图片
 */
export const reqSwitchCollect = (id, collect) => {
  return http({
    method: 'put',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}

/**
 * 删除图片素材
 */
export const reqDelImage = (id) => {
  return http({
    method: 'delete',
    url: `/mp/v1_0/user/images/${id}`
  })
}
