import request from '@/utils/fetch'


import Cookies from 'js-cookie'

const TokenKey = '"JSESSIONID"'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey,{path:'/'})
}
export function logout(id) {
    return request.get('/logOut')
}

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
