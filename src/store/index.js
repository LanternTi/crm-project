// store/index.ts
import { defineStore } from 'pinia'
import { reactive } from 'vue'
// 1. 定义容器、导出容器
// 参数1：容器的ID，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
// 参数2：一些选项对象，也就是state、getter和action
// 返回值：一个函数，调用即可得到容器实例

export const useMainStore = defineStore(
    'main',
    () => {
        var user = reactive({ userId: 0, userName: '', userPassword: '', userRoleId: 0 })
        return { user }
    },
    {
        persist: true
    }
)
