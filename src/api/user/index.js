import request from '@/utils/fetch'

/**
 * @param  {JSON} data
 * @param {String} data.loginParam
 * @param {String} data.password
 */
export function login(data) {
    return request.post('/userLogin', data)
}


export function getCurrentUserInfo() {
    return request.get('/front/getCurrentUserInfo')
}

export function getAllDevices() {
    return request.get('/getAllDevices/0/10')
}
export function createADevice() {
    return request.get('/api/user/createADevice')
}