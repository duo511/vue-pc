import http from '@/utils/request.js'

/**
 * 获取文章列表
 */
export const reqGetArticles = queryObj => {
  return http({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: queryObj || {}
  })
}

/**
 * 获取文章频道
 */
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章
 */
export const reqDelArticle = (articleId) => {
  return http({
    method: 'delete',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/**
 * 发表文章
 */
export const reqAddArticle = (draft, articleObj) => {
  return http({
    method: 'post',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data: articleObj
  })
}

/**
 * 获取指定文章
 * @param {*} id
 */
export const reqGetArticleById = (id) => {
  return http({
    method: 'get',
    url: `/mp/v1_0/articles/${id}`
  })
}

/**
 * 编辑文章
 * @param {*} id
 * @param {*} draft
 * @param {*} data
 */
export const reqEditArticle = (id, draft, data) => {
  return http({
    method: 'put',
    url: `/mp/v1_0/articles/${id}`,
    params: {
      draft
    },
    data
  })
}
