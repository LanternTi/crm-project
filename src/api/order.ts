import request from ".";

//模糊查询客户贡献
export function orderByLike(data?: any) {
    return request.post({
        url: 'order/orderLike',
        params: data
    })
}
//根据类别统计客户
export function getCstByType(data?: any) {
    return request.get({
        url: 'order/conditioning',
        params: { type: data }
    })
}
//根据类别获取服务数量
export function getServiceCount(data?: any) {
    return request.get({
        url: 'order/serviceCount',
        params: data
    })
}
//获取流失客户
export function getLoss(data?: any) {
    return request.post({
        url: 'order/getLoss',
        params: data
    })
}