<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户流失管理">
                <el-descriptions-item label="显示即将流失的客户信息，并制定挽救措施"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <el-form :inline="true" class="demo-form-inline" :model="selword">
                <el-form-item label="客户名称">
                    <el-input v-model="selword.csmName" placeholder="请输入客户名称" clearable />
                </el-form-item>
                <el-form-item label="客户经理">
                    <el-input v-model="selword.csmBoss" placeholder="请输入客户经理名称" clearable />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="selword.csmState" class="m-2">
                        <el-option v-for="item in csmState" :key="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-table border show-header-overflow show-overflow :row-config="{ isHover: true }" :data="tableData2">
                <vxe-column type=" seq" title="客户名称" width="100"></vxe-column>
                <vxe-column field="name" title="概要"></vxe-column>
                <vxe-column field="sex" title="联系人"></vxe-column>
                <vxe-column field="age" title="联系电话"></vxe-column>
                <vxe-column field="address" title="创建时间"></vxe-column>
                <!-- <vxe-column field="address" title="操作"></vxe-column> -->
            </vxe-table>
            <vxe-pager background v-model:current-page="page5.currentPage" v-model:page-size="page5.pageSize"
                :total="page5.totalResult"
                :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Total']">
            </vxe-pager>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

let selword = reactive({
    csmName: "",
    csmBoss: "",
    csmState: "全部"
})

const csmState = ref(["全部", "预警", "暂缓流失", "确认流失"])

const tableData2 = ref([

])
const page5 = reactive({
    currentPage: 1,
    pageSize: 10,
    totalResult: 300
})
</script>

<style lang="css" scoped>
.padding-box {
    padding-top: 20px;
    margin-top: 20px;
}

.vxe-table {
    margin-left: 20px;
    margin-right: 20px;
}
</style>