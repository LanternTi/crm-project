import request from ".";

//模糊查询销售机会
export function salByLike(data?: any) {
    return request.get({
        url: 'sal/chanceLike',
        params: data
    })
}
//编辑销售机会
export function editChance(data: any) {
    return request.post({
        url: 'sal/editChance',
        params: data
    })
}
//删除销售机会
export function delChance(id: number) {
    return request.delete({
        url: 'sal/delChance',
        params: { chcId: id }
    })
}
//添加销售机会
export function addChance(data: any) {
    return request.post({
        url: 'sal/addChance',
        params: data
    })
}
//分配销售机会
export function disChance(data: any) {
    return request.post({
        url: 'sal/disChance',
        params: data
    })
}