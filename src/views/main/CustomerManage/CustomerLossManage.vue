<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户流失管理">
                <el-descriptions-item label="客户流失管理显示即将流失的客户信息，并制定挽救措施"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #svrCustName_item="{ data }">
                    <vxe-input v-model="data.lstCustName" type="text" placeholder="请输入客户名称"></vxe-input>
                </template>
                <template #svrTitle_item="{ data }">
                    <vxe-input v-model="data.lstCustManagerName" type="text" placeholder="请输入客户经理"></vxe-input>
                </template>
                <template #svrType_item="{ data }">
                    <el-select v-model="data.lstStatus" class="m-2" placeholder="请选择状态">
                        <el-option v-for="item in lostStatus" :key="item.value" :value="item.value"
                            :label="item.label" />
                    </el-select>
                </template>
                <template #submit_item>
                    <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                </template>
                <template #operate="{ row }">
                    <vxe-button size="mini" content="暂缓流失" status="warning" round @click="openModal(1)"
                        v-if="row.lstStatus != 3">
                    </vxe-button>
                    <vxe-button size="mini" content="确认流失" status="danger" round @click="openModal(2)"
                        v-if="row.lstStatus != 3">
                    </vxe-button>
                    <vxe-button size="mini" content="查看" status="success" round @click="openModal(3)"
                        v-if="row.lstStatus == 3">
                    </vxe-button>
                    <vxe-modal v-model="modalStatus" show-footer :draggable="false" width="50%" :title=modalTitle
                        @confirm="editByForm(row)">
                        <template #default>
                            <vxe-form :data="row" title-align="right" custom-layout>
                                <vxe-form-item title="客户编号:" field="lstCustNo" :span=12>
                                    <template #default>
                                        <vxe-input v-model="row.lstCustNo" placeholder="请输入条目" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="客户名字:" field="lstCustName" :span=12>
                                    <template #default>
                                        <vxe-input v-model="row.lstCustName" placeholder="请输入条目" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="客户经理姓名:" field="lstCustManagerName" :span=12>
                                    <template #default>
                                        <vxe-input v-model="row.lstCustManagerName" placeholder="请输入值" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="最后下单时间:" field="lstLastOrderDate" :span=12>
                                    <template #default>
                                        <el-date-picker v-model="row.lstLastOrderDate" type="date" disabled />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="暂缓措施:" field="lstDelay" :span=12>
                                    <template #default>
                                        <el-input v-model="row.lstDelay" :rows="2" type="textarea"
                                            placeholder="Please input" disabled />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="追加暂缓措施:" field="lstDelay" :span=12
                                    v-if="formVisible.appendsLstDelay">
                                    <template #default>
                                        <el-input v-model="row.lstDelay" :rows="2" type="textarea"
                                            placeholder="请输入措施" />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="流失原因:" field="lstReason" :span=12 v-if="formVisible.addReason">
                                    <template #default>
                                        <el-input v-model="row.lstReason" :rows="2" type="textarea" placeholder="请输入措施"
                                            :disabled="formVisible.inputDis" />
                                    </template>
                                </vxe-form-item>
                            </vxe-form>
                        </template>
                    </vxe-modal>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { lostInfoByLike, editLostInfo } from '@/api/cstLost'
import { ElMessage } from 'element-plus'

var modalStatus = ref(false)
var modalTitle = ref('')
var formVisible = reactive({
    appendsLstDelay: true,
    addReason: false,
    inputDis: true
})

const lostStatus = ref([
    { value: '', label: '全部' },
    { value: '1', label: '预警' },
    { value: '2', label: '暂缓流失' },
    { value: '3', label: '确认流失' }
])
const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    border: true,
    showOverflow: 'tooltip',
    height: 530,
    rowConfig: {
        keyField: 'lstCustNo',
        isHover: true
    },
    columnConfig: {
        resizable: true
    },
    checkboxConfig: {
        reserve: true
    },
    pagerConfig: {
        pageSize: 10
    },
    formConfig: {
        align: "left",
        items: [
            { span: 7, field: 'lstCustName', title: '客户名称', itemRender: {}, slots: { default: 'svrCustName_item' } },
            { span: 8, field: 'lstCustManagerName', title: '客户经理', itemRender: {}, slots: { default: 'svrTitle_item' } },
            { span: 7, field: 'lstStatus', title: '类型', itemRender: {}, slots: { default: 'svrType_item' } },
            { span: 2, itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'lstCustNo', title: '客户编号' },
        { field: 'lstCustName', title: '客户名称' },
        { field: 'lstCustManagerName', title: '客户经理' },
        { field: 'lstLastOrderDate', title: '最后下单时间' },
        { field: 'lstLostDate', title: '确认流失时间' },
        {
            field: 'lstStatus', title: '状态', formatter({ cellValue }) {
                if (cellValue == 1) {
                    return '预警'
                } else if (cellValue == 2) {
                    return '暂缓流失'
                } else {
                    return '确认流失'
                }
            }
        },
        { title: '操作', width: 200, slots: { default: 'operate' } }
    ],
    proxyConfig: {
        form: true,
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
            result: 'result',
            total: 'page.total'
        },
        ajax: {
            // 接收 Promise
            query: ({ page, form }) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        var list: any[] = [];
                        lostInfoByLike(form).then((res: any[]) => {
                            list = res
                            resolve({
                                page: {
                                    total: list.length
                                },
                                result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                            })
                        })
                    }, 1000)
                })
            }
        }
    }
})

const editByForm = async (row: any) => {
    editLostInfo(row).then((result) => {
        if (result == "修改成功") {
            ElMessage({
                message: result,
                type: 'success',
            })
        } else {
            ElMessage.error(result)
        }
        xGrid.value?.commitProxy('query')
    })
}
const openModal = (id: number) => {
    if (id == 1) {
        modalTitle.value = '暂缓流失'
        formVisible.appendsLstDelay = true
        formVisible.addReason = false
    } else if (id == 2) {
        modalTitle.value = '确认流失'
        formVisible.appendsLstDelay = false
        formVisible.addReason = true
        formVisible.inputDis = false
    } else {
        modalTitle.value = '确认流失'
        formVisible.addReason = true
        formVisible.appendsLstDelay = false
        formVisible.inputDis = true
    }
    modalStatus.value = true
}

</script>

<style lang="css" scoped>
.padding-box {
    padding-top: 20px;
    margin-top: 20px;
}

.size--mini {
    margin-left: 10px;
}
</style>