<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户信息管理">
                <el-descriptions-item label="维护客户信息，记录客户联系电话和交往记录"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <el-form :inline="true" class="demo-form-inline" :model="selword">
                <el-form-item label="客户名称">
                    <el-input v-model="selword.csmName" placeholder="请输入客户名称" clearable />
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input v-model="selword.csmId" placeholder="请输入联系人名称" clearable />
                </el-form-item>
                <el-form-item label="地区">
                    <el-select v-model="selword.area" class="m-2">
                        <el-option v-for="item in area" :key="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="客户经理">
                    <el-input v-model="selword.csmBoss" placeholder="请输入客户经理名称" clearable />
                </el-form-item>
                <el-form-item label="客户等级">
                    <el-select v-model="selword.csmLv" class="m-2">
                        <el-option v-for="item in lv" :key="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-table border show-header-overflow show-overflow :row-config="{ isHover: true }" :data="tableData2">
                <vxe-column title="客户编号" width="100"></vxe-column>
                <vxe-column title="客户名称"></vxe-column>
                <vxe-column title="地区"></vxe-column>
                <vxe-column title="客户经理"></vxe-column>
                <vxe-column title="客户等级"></vxe-column>
                <vxe-column title="建立时间"></vxe-column>
                <vxe-column title="操作"></vxe-column>
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
    csmId: "",
    area: "全部",
    csmBoss: "",
    csmLv: "全部",

})

const area = ref(["全部", "华北", "华南", "中南", "西北"])
const lv = ref(["全部", "战略合作伙伴", "合作伙伴", "大客户", "普通客户"])
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