import request from '@/utils/fetch'

/**
 * 获取用户所有分组
 * @param {Number} cur_page 页码
 * @param {Number} page_size 页数据量
 */
export function getAllGroupsByPage(cur_page,page_size) {
    return request.get('/user/getAllGroupByPage/0/10'+cur_page+'/'+page_size)
}

export function getAllGroups() {
    return request.get('/user/getALlGroups')
}