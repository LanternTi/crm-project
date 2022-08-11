<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="服务反馈">
                <el-descriptions-item label="对于客户提出的咨询、建议、投诉等服务进行处理完毕后，记录客户对服务的结果的满意度等"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #svrCustName_item="{ data }">
                    <vxe-input v-model="data.svrCustName" type="text" placeholder="请输入客户名称"></vxe-input>
                </template>
                <template #svrTitle_item="{ data }">
                    <vxe-input v-model="data.svrTitle" type="text" placeholder="请输入概要"></vxe-input>
                </template>
                <template #svrType_item="{ data }">
                    <el-select v-model="data.svrType" class="m-2" placeholder="请选择服务类型">
                        <el-option v-for="item in serviceType" :key="item.value" :value="item.value"
                            :label="item.label" />
                    </el-select>
                </template>
                <template #svrCreateDate_item="{ data }">
                    <el-date-picker v-model="data.svrCreateDate" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" />
                </template>
                <template #svrStatus_item="{ data }">
                    <el-select v-model="data.svrStatus" class="m-2" placeholder="请选择状态">
                        <el-option v-for="item in svrStatus" :value="item.value" :label="item.label" />
                    </el-select>
                </template>
                <template #submit_item>
                    <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                </template>
                <template #operate2="{ row }">
                    <vxe-button size="mini" content="反馈" status="primary" round v-if="row.svrStatus === '已处理'"
                        @click="toDo(row)">
                    </vxe-button>
                    <vxe-modal v-model="modalStatus" show-footer :draggable="false" width="50%" title="服务信息（状态：已处理）"
                        @confirm="doForm()">
                        <template #default>
                            <vxe-form :data="form" title-align="right" custom-layout>
                                <vxe-form-item title="客户名称:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrCustName" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="服务类型:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrType" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="服务概要:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrTitle" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="详细信息:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrRequest" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建人:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrCreateBy" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建时间:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrCreateDate" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="分配人:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrDueTo" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="分配时间:" :span=12>
                                    <template #default>
                                        <vxe-input v-model="form.svrDueDate" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="服务处理 :" :span=12>
                                    <template #default>
                                        <el-input v-model="form.svrDeal" :rows="2" type="textarea" disabled />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="处理人 :" :span=12>
                                    <template #default>
                                        <el-input v-model="form.svrDealBy" disabled />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="处理时间 :" :span=12>
                                    <template #default>
                                        <el-input v-model="form.svrDealDate" disabled />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="满意度 :" :span=12>
                                    <template #default>
                                        <el-rate v-model="form.svrSatisfy" :colors="colors" />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="处理结果 :" :span=12>
                                    <template #default>
                                        <el-input v-model="form.svrResult" :rows="2" type="textarea"
                                            placeholder="请输入处理结果" />
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
import { serviceByLike, editService, delService } from '@/api/service'
import { ElMessage } from 'element-plus'

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
var modalStatus = ref(false)
var form = reactive(
    { svrDealDate: '', svrDealBy: '', svrResult: '', svrSatisfy: '', svrId: '', svrDeal: '', svrCustName: '', svrType: '', svrTitle: '', svrRequest: '', svrCreateBy: '', svrCreateDate: '', svrDueTo: '', svrDueDate: '' }
)
const serviceType = ref([
    { value: '', label: '全部' },
    { value: '咨询', label: '咨询' },
    { value: '建议', label: '建议' },
    { value: '投诉', label: '投诉' }
])
const svrStatus = ref([
    { value: '', label: '全部' },
    { value: '新创建', label: '新创建' },
    { value: '已分配', label: '已分配' },
    { value: '已处理', label: '已处理' },
    { value: '已反馈', label: '已反馈' },
    { value: '已归档', label: '已归档' }
])
const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    border: true,
    showOverflow: 'tooltip',
    height: 530,
    rowConfig: {
        keyField: 'productId',
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
            { field: 'svrCustName', title: '客户名称', span: 8, itemRender: {}, slots: { default: 'svrCustName_item' } },
            { field: 'svrTitle', title: '概要', span: 8, itemRender: {}, slots: { default: 'svrTitle_item' } },
            { field: 'svrType', title: '服务类型', span: 8, itemRender: {}, slots: { default: 'svrType_item' } },
            { field: 'svrCreateDate', title: '年份', span: 10, itemRender: {}, slots: { default: 'svrCreateDate_item' } },
            { field: 'svrStatus', title: '状态', span: 4, itemRender: {}, slots: { default: 'svrStatus_item' } },
            { span: 4, itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'svrCustName', title: '客户姓名' },
        { field: 'svrTitle', title: '服务概要' },
        { field: 'svrType', title: '服务类型' },
        { field: 'svrCreateBy', title: '创建人' },
        { field: 'svrCreateDate', title: '创建时间' },
        { title: '反馈', width: 100, slots: { default: 'operate2' } }
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
                        serviceByLike(form).then((res: any[]) => {
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

const doForm = async () => {
    editService(form).then((result: any) => {
        if (result == "修改成功") {
            ElMessage({
                message: result,
                type: 'success',
            })
            xGrid.value?.commitProxy('query')
        } else {
            ElMessage.error(result)
        }
    })
}

const toDo = async (row: any) => {
    Object.keys(form).forEach(key => form[key] = '')
    form.svrId = row.svrId
    form.svrDealDate = row.svrDealDate
    form.svrDealBy = row.svrDealBy
    form.svrCustName = row.svrCustName
    form.svrType = row.svrType
    form.svrTitle = row.svrTitle
    form.svrRequest = row.svrRequest
    form.svrCreateBy = row.svrCreateBy
    form.svrCreateDate = row.svrCreateDate
    form.svrDueTo = row.svrDueTo
    form.svrDueDate = row.svrDueDate
    form.svrDeal = row.svrDeal
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