import http from '@/utils/request.js'

/**
 * 获取评论列表
 * @param {}} page
 * @param {*} perPage
 */
export const reqGetComment = (page, perPage) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: {
      page,
      per_page: perPage,
      response_type: 'comment'
    }
  })
}

export const reqCommentStatus = (id, allowComment) => {
  return http({
    method: 'put',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment: allowComment
    }
  })
}
