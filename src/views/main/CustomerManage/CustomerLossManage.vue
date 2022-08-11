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
                    <vxe-button size="mini" content="暂缓流失" status="warning" round @click="">
                    </vxe-button>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { lostInfoByLike } from '@/api/cstLost'
import { ElMessage } from 'element-plus'

var modalStatus = ref(false)

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
            { field: 'lstCustName', title: '客户名称', span: 8, itemRender: {}, slots: { default: 'svrCustName_item' } },
            { field: 'lstCustManagerName', title: '客户经理', span: 8, itemRender: {}, slots: { default: 'svrTitle_item' } },
            { field: 'lstStatus', title: '类型', span: 8, itemRender: {}, slots: { default: 'svrType_item' } },
            { itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'lstCustNo', title: '客户编号' },
        { field: 'lstCustName', title: '客户名称' },
        { field: 'lstCustManagerName', title: '客户经理' },
        { field: 'lstLastOrderDate', title: '最后下单时间' },
        { field: 'lstLostDate', title: '确认流失时间' },
        { field: 'lstStatus', title: '状态' },
        { title: '操作', width: 100, slots: { default: 'operate' } }
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