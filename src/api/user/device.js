import request from '@/utils/fetch'

/**
 * 用户查看自己的设备
 * @param {Number} cur_page 页码
 * @param {Number} page_size 页数据量
 */
export function getAllDevices(cur_page,page_size) {
    return request.get('/user/getAllDevices/'+cur_page+'/'+page_size)
}

/**
 * 用户增加设备
 * @param {JSON} data 
 */
export function createADevice(data) {
    return request.post('/user/createADevice',data)
}
/**
 * 用户删除指定设备
 * @param {Number} id 设备id
 */
export function delADevice(id) {
    return request.delete('/user/delete/'+id)
}

/**
 * 用户查看自己的设备状况
 */
export function getCurrentState() {
    return request.get('/user/getCurrentState')
}

