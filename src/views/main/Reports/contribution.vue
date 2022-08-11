<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户贡献分析">
                <el-descriptions-item label="查看客户的销售总金额（从高到低排序）"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #name_item="{ data }">
                    <vxe-input v-model="data.odrCustomer" type="text" placeholder="请输入客户名称"></vxe-input>
                </template>
                <template #contact_item="{ data }">
                    <el-date-picker v-model="data.odrDate" type="year" placeholder="选择年份" value-format="YYYY" />
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
import { orderByLike } from '@/api/order'

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
            { field: 'odrCustomer', title: '客户名称', itemRender: {}, slots: { default: 'name_item' } },
            { field: 'odrDate', title: '年份', itemRender: {}, slots: { default: 'contact_item' } },
            { itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'oddId', title: '序号' },
        { field: 'odrCustomer', title: '客户姓名' },
        { field: 'res', title: '订单金额(元)' },
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
                        orderByLike(form).then((res: any[]) => {
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