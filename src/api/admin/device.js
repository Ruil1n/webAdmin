import request from '@/utils/fetch'

/**
 * 管理员查看所有设备
 * @param {Number} cur_page 页码
 * @param {Number} page_size 页数据量
 */
export function getAllDevices(cur_page,page_size) {
    return request.get('/admin/getAllDevices/'+cur_page+'/'+page_size)
}

export function getDeviceDetail(DeviceId) {
    console.log(DeviceId)
    return request.get('/admin/getDeviceDetail/'+DeviceId)
}
export function delADevice(id) {
    return request.delete('/admin/delete/'+id)
}