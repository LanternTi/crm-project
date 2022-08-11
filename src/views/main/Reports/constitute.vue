<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户构成分析">
                <el-descriptions-item label="根据客户的相关信息显示 "></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #name_item>
                    <el-select v-model="type.value" class="m-2" placeholder="请选择报表方式" @change="change()">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </template>
                <template #name_header>
                    <span>{{ type.title }}</span>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { getCstByType } from '@/api/order'
var type = reactive({
    title: '满意度',
    value: 1
})
const options = reactive([
    { value: 1, label: "按满意度" },
    { value: 2, label: "按信用度" },
    { value: 3, label: "按客户等级" }
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
        items: [
            { field: 'type', title: '报表方式', itemRender: {}, slots: { default: 'name_item' } }
        ]
    },
    columns: [
        { type: 'seq', width: 50 },
        {
            field: 'result', slots: { header: 'name_header' }, formatter({ cellValue }) {
                if (type.value == 1) {
                    if (cellValue == 1) {
                        return '⭐'
                    } else if (cellValue == 2) {
                        return '⭐⭐'
                    } else if (cellValue == 3) {
                        return '⭐⭐⭐'
                    } else if (cellValue == 4) {
                        return '⭐⭐⭐⭐'
                    } else if (cellValue == 5) {
                        return '⭐⭐⭐⭐⭐'
                    }
                } else if (type.value == 2) {
                    if (cellValue == 1) {
                        return '⭐'
                    } else if (cellValue == 2) {
                        return '⭐⭐'
                    } else if (cellValue == 3) {
                        return '⭐⭐⭐'
                    } else if (cellValue == 4) {
                        return '⭐⭐⭐⭐'
                    } else if (cellValue == 5) {
                        return '⭐⭐⭐⭐⭐'
                    }
                } else if (type.value == 3) {
                    if (cellValue == 1) {
                        return '普通客户'
                    } else if (cellValue == 2) {
                        return '重点开发客户'
                    } else if (cellValue == 3) {
                        return '大客户'
                    } else if (cellValue == 4) {
                        return '合作伙伴'
                    } else if (cellValue == 5) {
                        return '战略合作伙伴'
                    }
                }
            }
        },
        { field: 'res', title: '客户数量' },
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
            query: ({ page }) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        var list: any[] = [];
                        getCstByType(type.value).then((res: any[]) => {
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
const change = async () => {
    if (type.value == 1) {
        type.title = '满意度'
    } else if (type.value == 2) {
        type.title = '信用度'
    } else {
        type.title = '等级'
    }
    xGrid.value?.commitProxy('query')
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