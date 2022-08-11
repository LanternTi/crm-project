import request from ".";

//根据id修改客户信息
export function updateCustomerInfoById(data?: any) {
    return request.post({
        url: 'customer/updateCustomerInfoById',
        params: data
    })
}

//查询客户的联系人
export function selectCustomerContacts(data?: any) {
    return request.get({
        url: 'customer/selectCustomerContacts',
        params: data
    })
}

//修改客户联系人
export function updateCustomerContacts(data?: any) {
    return request.post({
        url: 'customer/updateCustomerContacts',
        params: data
    })
}

//删除用户联系人
export function deleteCustomerContactsById(id: number) {
    return request.delete({
        url: 'customer/deleteCustomerContactsById',
        params: { lkmId: id }
    })
}

//新增联系人
export function insertCustomerContacts(data?: any) {
    return request.post({
        url: 'customer/insertCustomerContacts',
        params: data
    })
}

//客户信息模糊查
export function selectCustomerContactsByName(data?: any) {
    return request.get({
        url: 'customer/selectCustomerContactsByName',
        params: data
    })
}

//查询客户交往记录
export function selectCustomerInteraction(data?: any) {
    return request.get({
        url: 'customer/selectCustomerInteraction',
        params: data
    })
}

//添加客户交往记录
export function insertCustomerInteraction(data?: any) {
    return request.post({
        url: 'customer/insertCustomerInteraction',
        params: data
    })
}

//根据id删除客户交往记录
export function deleteCustomerInteraction(id: number) {
    return request.delete({
        url: 'customer/deleteCustomerInteraction',
        params: { atvId: id }
    })
}

//根据客户名称查询客户订单
export function selectCustomerInteractionById(data?: any) {
    return request.get({
        url: 'customer/selectCustomerInteractionById',
        params: data
    })
}

//查询客户订单详情
export function selectCustomerInteractionInfo(data?: any) {
    return request.get({
        url: 'customer/selectCustomerInteractionInfo',
        params: data
    })
}

//修改客户交往记录
export function UpdateCustomerInteraction(data?: any) {
    return request.post({
        url: 'customer/UpdateCustomerInteraction',
        params: data
    })
}

//删除客户
export function delCustomer(id: number) {
    return request.delete({
        url: 'customer/delCustomer',
        params: { custNo: id }
    })
}