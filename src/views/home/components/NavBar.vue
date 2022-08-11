<template>
    <el-page-header content="首页" title="登出" @back="logout()" />

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from "@/store"


const router = useRouter()
const logout = () => {
    const mainStore = useMainStore()
    const { user } = storeToRefs(mainStore);
    Object.keys(user.value).forEach(key => user.value[key] = '')
    router.push('/login')
}
</script>

<style lang="css">
.el-page-header {
    line-height: 50px;
}
</style>