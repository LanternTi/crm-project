import request from ".";

//模糊查询仓库
export function storageByLike(data?: any) {
    return request.post({
        url: 'storage/storageLike',
        params: data
    })
}