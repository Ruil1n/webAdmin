import request from '@/utils/fetch'

/**
 * 用户登陆接口
 * @param {JSON} data
 * @param {String} data.loginParam 用户名
 * @param {String} data.password 密码
 */
export function login(data) {
    return request.post('/userLogin', data)
}

/** 
 * 获取当前用户信息
*/
export function getCurrentUserInfo() {
    return request.get('/front/getCurrentUserInfo')
}
