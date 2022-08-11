import request from ".";

//用户登录
export function userLogin(data?: any) {
    return request.get({
        url: 'user/login',
        params: data
    })
}