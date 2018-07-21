import axios from 'axios'
import qs from 'qs'
import {
  // MessageBox,
  Message
} from 'element-ui'
import {
    STATE_WRONG,
    STATE_OK,
    STATE_UNAUTHORIZED
} from '@/config'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const {
      state,
      message
    } = response.data
    if (state !== STATE_OK) {
      if (state === STATE_UNAUTHORIZED) {
        Message({
            message: message || '用户未登陆',
            type: 'error',
            duration: 3 * 1000
          })
        router.replace({
            path: '/login',
        })
      }
      Message({
        message: message || '操作失败!',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('操作失败')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
