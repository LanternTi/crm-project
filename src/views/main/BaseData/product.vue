<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="产品查询">
                <el-descriptions-item label="查询产品信息"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #name_item="{ data }">
                    <vxe-input v-model="data.prodName" type="text" placeholder="请输入名称"></vxe-input>
                </template>
                <template #contact_item="{ data }">
                    <vxe-input v-model="data.prodType" type="text" placeholder="请输入型号"></vxe-input>
                </template>
                <template #briefly_item="{ data }">
                    <vxe-input v-model="data.prodBatch" type="text" placeholder="请输入批次"></vxe-input>
                </template>
                <template #submit_item>
                    <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { productByLike } from '@/api/product'

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
        items: [
            { field: 'prodName', title: '名称', itemRender: {}, slots: { default: 'name_item' } },
            { field: 'prodType', title: '型号', itemRender: {}, slots: { default: 'contact_item' } },
            { field: 'prodBatch', title: '批次', itemRender: {}, slots: { default: 'briefly_item' } },
            { itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'prodName', title: '名称' },
        { field: 'prodType', title: '型号' },
        { field: 'prodBatch', title: '批次' },
        { field: 'prodUnit', title: '单位' },
        { field: 'prodPrice', title: '单价' },
        { field: 'prodMemo', title: '备注' }
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
                        productByLike(form).then((res: any[]) => {
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