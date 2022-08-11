import request from ".";

//模糊查询销售机会
export function planByLike(data?: any) {
    return request.get({
        url: 'plan/planLike',
        params: data
    })
}
//更改销售机会状态
export function editStatus(chcId: number, chcStatus: number) {
    return request.post({
        url: 'plan/editStatus',
        params: { chcId, chcStatus }
    })
}
//获取销售计划，根据机会ID
export function getPlanByChcId(chcId: number) {
    return request.get({
        url: 'plan/getPlan',
        params: { chcId }
    })
}
//修改计划
export function editPlan(data?: any) {
    return request.post({
        url: 'plan/editPlan',
        params: data
    })
}
//删除销售计划
export function delPlan(id: number) {
    return request.delete({
        url: 'plan/delPlan',
        params: { plaId: id }
    })
}
//新建销售计划
export function addPlan(plaDate: string, plaTodo: string, plaChcId: number) {
    return request.post({
        url: 'plan/addPlan',
        params: {
            plaId: null,
            plaChcId: plaChcId,
            plaDate: plaDate,
            plaTodo: plaTodo,
            plaResult: ''
        }
    })
}
