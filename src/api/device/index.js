import request from '@/utils/fetch'

/**
 * 获取指定设备详细信息
 * @param DeviceId
 * @returns {*}
 */
export function getDeviceDetails(DeviceId) {
    return request.get('/device/getDeviceDetail/'+DeviceId)
}

/**
 * 获取指定设备日志
 * @param DeviceId
 * @returns {*}
 */
export function getDeviceLog(DeviceId) {
    return request.get('/device/getAllLogByPage/'+DeviceId+'/0/10')
}

/**
 * cmd接口
 * @param {JSON} data 
 */
export function sendCmdToDevice(data) {
    return request.post('/api/v1/sendCmdToDevice',data)
}