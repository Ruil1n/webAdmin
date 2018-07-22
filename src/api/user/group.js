import request from '@/utils/fetch'

/**
 * 分页获取用户所有分组
 * @param {Number} cur_page 页码
 * @param {Number} page_size 页数据量
 */
export function getAllGroupsByPage(cur_page,page_size) {
    return request.get('/user/getAllGroupByPage/'+cur_page+'/'+page_size)
}

/**
 * 获取用户所有分组
 */
export function getAllGroups() {

    return request.get('/user/getAllGroupByPage/0/10')
}

export function sendCmdToGroup(data) {
    return request.post('/api/v1/sendCmdToGroup',data)

}