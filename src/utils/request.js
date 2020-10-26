import axios from 'axios'
import JSONbig from 'json-bigint'
import { getUser } from '@/utils/storage.js'

// 配置axios实例
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 基地址
  transformResponse: [function (data) {
    // try 尝试  catch 尝试失败
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
  // timeout: 1000, // 请求等待延时事件
  // headers: { 'X-Custom-Header': 'foobar' } // 请求头
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 统一携带token
  const userInfo = getUser()
  if (userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

export default http
