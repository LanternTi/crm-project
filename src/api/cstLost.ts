import request from ".";

//模糊查询流失信息
export function lostInfoByLike(data?: any) {
    return request.get({
        url: 'lost/getLostInfo',
        params: data
    })
}

//添加数据字典
export function editLostInfo(data?: any) {
    return request.post({
        url: 'lost/editLostInfo',
        params: data
    })
}