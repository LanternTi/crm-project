import request from ".";

//模糊查询客户服务
export function serviceByLike(data?: any) {
    return request.get({
        url: 'service/getService',
        params: data
    })
}

//创建客户服务
export function addService(data?: any) {
    return request.post({
        url: 'service/addService',
        params: data
    })
}

//删除客户服务
export function delService(id: number) {
    return request.delete({
        url: 'service/delService',
        params: { serId: id }
    })
}

//修改客户服务
export function editService(data?: any) {
    return request.post({
        url: 'service/editService',
        params: data
    })
}