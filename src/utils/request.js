import axios from 'axios'

// 配置axios实例
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 基地址
  // timeout: 1000, // 请求等待延时事件
  // headers: { 'X-Custom-Header': 'foobar' } // 请求头
})

export default http
