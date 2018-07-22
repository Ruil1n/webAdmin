import request from '@/utils/fetch'

/**
 * 获取用户所有分组
 */
export function getAllGroups() {
    return request.get('/user/getAllGroupByPage/0/10')
}

export function sendCmdToGroup(data) {
    return request.post('/api/v1/sendCmdToGroup',data)
}