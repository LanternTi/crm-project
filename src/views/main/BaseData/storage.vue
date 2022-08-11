<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="库存查询">
                <el-descriptions-item label="查询产品库存信息"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #name_item="{ data }">
                    <vxe-input v-model="data.prodName" type="text" placeholder="请输入产品名称"></vxe-input>
                </template>
                <template #contact_item="{ data }">
                    <vxe-input v-model="data.stkWarehouse" type="text" placeholder="请输入仓库"></vxe-input>
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
import { storageByLike } from '@/api/storage'

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
            { field: 'prodName', title: '产品名称', itemRender: {}, slots: { default: 'name_item' } },
            { field: 'stkWarehouse', title: '仓库', itemRender: {}, slots: { default: 'contact_item' } },
            { itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'prodName', title: '产品名称' },
        { field: 'stkWarehouse', title: '仓库' },
        { field: 'stkWare', title: '货位' },
        { field: 'stkCount', title: '件数' },
        { field: 'stkMemo', title: '备注' }
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
                        storageByLike(form).then((res: any[]) => {
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