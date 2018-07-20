import request from '@/utils/fetch'

/**
 * 获取用户所有分组
 */
export function getAllGroups() {
    return request.get('/user/getALlGroups')
}
