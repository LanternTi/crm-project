import { createRouter, createWebHashHistory } from "vue-router";
import { useMainStore } from "@/store"
import { storeToRefs } from 'pinia'


const routes = [
    { path: "/login", component: () => import('views/login/Login.vue') },
    {
        path: "/home", component: () => import('views/home/index.vue'),
        children: [
            { path: "/default", component: () => import('views/main/default.vue') },
            { path: "/salesManage", component: () => import('views/main/SalesManage/SalesManage.vue') },
            { path: "/customerExploitation", component: () => import('views/main/SalesManage/CustomerExploitation.vue') },
            { path: "/customerInfoManage", component: () => import('views/main/CustomerManage/CustomerInfoManage.vue') },
            { path: "/customerLossManage", component: () => import('views/main/CustomerManage/CustomerLossManage.vue') },
            { path: "/createService", component: () => import('views/main/ServiceManage/CreateService.vue') },
            { path: "/disService", component: () => import('views/main/ServiceManage/disService.vue') },
            { path: "/doService", component: () => import('views/main/ServiceManage/doService.vue') },
            { path: "/feedback", component: () => import('views/main/ServiceManage/feedback.vue') },
            { path: "/archive", component: () => import('views/main/ServiceManage/archive.vue') },
            { path: "/dict", component: () => import('views/main/BaseData/dictManage.vue') },
            { path: "/product", component: () => import('views/main/BaseData/product.vue') },
            { path: "/storage", component: () => import('views/main/BaseData/storage.vue') },
            { path: "/contribution", component: () => import('views/main/Reports/contribution.vue') },
            { path: "/constitute", component: () => import('views/main/Reports/constitute.vue') },
            { path: "/serve", component: () => import('views/main/Reports/serve.vue') },
            { path: "/loss", component: () => import('views/main/Reports/loss.vue') },
            { path: "/home", redirect: '/default' }
        ]
    },
    { path: "/", redirect: '/home' }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
router.beforeEach(async (to, from, next) => {
    const mainStore = useMainStore()
    const { user } = storeToRefs(mainStore)
    if (user.value.userName == '' && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})
export {
    router
}