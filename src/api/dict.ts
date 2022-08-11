import request from ".";

//模糊查询数据字典
export function dictByLike(data?: any) {
    return request.post({
        url: 'dict/dictLike',
        params: data
    })
}

//添加数据字典
export function addDict(data?: any) {
    return request.post({
        url: 'dict/addDict',
        params: data
    })
}

//删除数据字典
export function delDict(id: number) {
    return request.delete({
        url: 'dict/delDict',
        params: { dictId: id }
    })
}

//修改数据字典
export function editDict(data?: any) {
    return request.post({
        url: 'dict/editDict',
        params: data
    })
}