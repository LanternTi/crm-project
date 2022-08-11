import request from ".";

//模糊查询产品
export function productByLike(data?: any) {
    return request.post({
        url: 'product/productLike',
        params: data
    })
}