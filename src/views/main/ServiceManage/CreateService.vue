<template>
    <div>
        <el-card shadow="always" style="width: 70%;margin: 0 auto;">
            <template #header>
                <strong>创建服务</strong>
            </template>
            <el-form :model="form" ref="serviceFrom" label-width="100px" :inline="false" size="default" :rules="rules"
                status-icon>
                <el-form-item label="客户名称" prop="svrCustName">
                    <el-input v-model="form.svrCustName" placeholder="请输入客户名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="服务类型" prop="svrType">
                    <el-select v-model="form.svrType" class="m-2" placeholder="选择服务类型">
                        <el-option v-for="item in serviceType" :key="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="服务概要" prop="svrTitle" clearable>
                    <el-input v-model="form.svrTitle" placeholder="请输入服务概要"></el-input>
                </el-form-item>
                <el-form-item label="详细信息" prop="svrRequest">
                    <el-input v-model="form.svrRequest" :autosize="{ minRows: 5, maxRows: 8 }" type="textarea"
                        placeholder="请输入服务详情" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(serviceFrom)" :loading="loading">立即创建</el-button>
                    <el-button @click="resetForm(serviceFrom)">清空</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from "@/store"
import { addService } from '@/api/service'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const mainStore = useMainStore()
var loading = ref(false)
const { user } = storeToRefs(mainStore);
const serviceType = ref(["咨询", "建议", "投诉"])
let serviceFrom = ref()
let form = reactive({
    svrCreateId: user.value.userId,
    svrCreateBy: user.value.userName,
    svrCustName: "",
    svrType: "",
    svrTitle: "",
    svrRequest: ""
})
const rules = reactive<FormRules>({
    svrCustName: [
        { required: true, message: '请输入客户名称', trigger: 'blur' }
    ],
    svrType: [
        { required: true, message: '请选择服务类型', trigger: 'blur' }
    ],
    svrTitle: [
        { required: true, message: '请输入服务概要', trigger: 'blur' }
    ],
    svrRequest: [
        { required: true, message: '请输入服务详情', trigger: 'blur' }
    ],
})
const onSubmit = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            addService(form).then((res: any) => {
                if (res == "添加成功") {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                } else {
                    ElMessage.error(res)
                }
            })
        } else {
            ElMessage.error("表单内容不能为空")
        }
    })
    loading.value = false
}
const resetForm = (from: any) => {
    const form = unref(serviceFrom)
    form.resetFields()
}
</script>

<style lang="css" scoped>
</style>