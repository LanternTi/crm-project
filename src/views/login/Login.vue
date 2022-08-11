<template>
    <img :src="bg" class="wave" />
    <div class="login-container">
        <div class="img">
            <component :is="currentWeek" />
        </div>
        <div class="login-box">
            <div class="login-form">
                <h2>CRM Admin</h2>
                <el-form :model="form" size="large">
                    <el-form-item prop="username">
                        <el-input clearable v-model="form.userName" placeholder="请输入账号" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input clearable show-password v-model="form.userPassword" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-button" size="default" type="primary" @click="login()"
                            :loading="loading">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { bg, currentWeek } from "@/views/login/utils/static"
import { userLogin } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useMainStore } from "@/store"

const router = useRouter()
const mainStore = useMainStore()
let loading = ref(false)
let form = reactive({ userName: '', userPassword: '' })
let login = () => {
    if (form.userName == '' || form.userPassword == '') {
        ElMessage.error('账号或密码不能为空')
        return
    }
    loading.value = true
    userLogin(form).then(res => {
        if (res != null && res != '') {
            ElMessage({
                message: '登录成功',
                type: 'success'
            })
            mainStore.$patch(state => {
                state.user.userId = res.userId
                state.user.userName = res.userName
                state.user.userPassword = res.userPassword
                state.user.userRoleId = res.userRoleId
            })
            setTimeout(() => {
                router.push('/home')
            }, 1000)
        } else {
            setTimeout(() => {
                loading.value = false
                ElMessage.error('账号或密码错误')
            }, 1000)
        }
    })
}
</script>

<style lang="css" scoped>
.login-button {
    width: 100%;
}

.img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.img img {
    width: 500px;
}

.wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
}

.login-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 2rem;
    grid-column-gap: 10rem;
}

.login-box {
    display: flex;
    align-items: center;
    text-align: center;
}

.login-form {
    width: 360px;
}

.login-form h2 {
    text-transform: uppercase;
    margin: 15px 0;
    color: #999;
    font: bold 200% Consolas, Monaco, monospace;
}
</style>