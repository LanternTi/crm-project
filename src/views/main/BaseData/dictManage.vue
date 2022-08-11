<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="数据字典管理">
                <el-descriptions-item label="管理系统所需的数据字典内容"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #name_item="{ data }">
                    <el-select v-model="data.dictType" class="m-2" placeholder="全部">
                        <el-option v-for="item in cstType" :value="item" />
                    </el-select>
                </template>
                <template #contact_item="{ data }">
                    <vxe-input v-model="data.dictItem" type="text" placeholder="请输入条目"></vxe-input>
                </template>
                <template #briefly_item="{ data }">
                    <vxe-input v-model="data.dictValue" type="text" placeholder="请输入值"></vxe-input>
                </template>
                <template #submit_item>
                    <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                </template>
                <template #create>
                    <vxe-button status="success" content="新建" @click="toAdd()"></vxe-button>
                    <vxe-modal v-model="modalStatus" show-footer :draggable="false" width="50%" title="数据字典"
                        @confirm="addDictByForm()">
                        <template #default>
                            <vxe-form :data="editForm" title-align="right" custom-layout>
                                <vxe-form-item title="类别:" field="dictType" :span=12>
                                    <template #default>
                                        <el-select v-model="editForm.dictType" class=" m-2" placeholder="请选择类别">
                                            <el-option v-for="item in cstType" :value="item" />
                                        </el-select>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="条目:" field="dictItem" :span=12>
                                    <template #default>
                                        <vxe-input v-model="editForm.dictItem" placeholder="请输入条目" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="值:" field="dictValue" :span=12>
                                    <template #default>
                                        <vxe-input v-model="editForm.dictValue" placeholder="请输入值" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="是否可编辑:" field="dictIsEditable" :span=12>
                                    <template #default>
                                        <el-radio-group v-model="editForm.dictIsEditable" class="ml-4">
                                            <el-radio label="1">可编辑</el-radio>
                                            <el-radio label="0">不可编辑</el-radio>
                                        </el-radio-group>
                                    </template>
                                </vxe-form-item>
                            </vxe-form>
                        </template>
                    </vxe-modal>
                </template>
                <template #operate="{ row }">
                    <template v-if="row.dictIsEditable === 1">
                        <vxe-button status="success" size="mini" content="编辑" round @click="toEdit(row)"></vxe-button>
                        <vxe-modal v-model="modalStatus1" show-footer :draggable="false" width="50%" title="数据字典"
                            @confirm="editDictByForm()">
                            <template #default>
                                <vxe-form :data="editForm" title-align="right" custom-layout>
                                    <vxe-form-item title="类别:" field="dictType" :span=12>
                                        <template #default>
                                            <el-select v-model="editForm.dictType" class=" m-2" placeholder="请选择类别">
                                                <el-option v-for="item in cstType" :value="item" />
                                            </el-select>
                                        </template>
                                    </vxe-form-item>
                                    <vxe-form-item title="条目:" field="dictItem" :span=12>
                                        <template #default>
                                            <vxe-input v-model="editForm.dictItem" placeholder="请输入条目" clearable>
                                            </vxe-input>
                                        </template>
                                    </vxe-form-item>
                                    <vxe-form-item title="值:" field="dictValue" :span=12>
                                        <template #default>
                                            <vxe-input v-model="editForm.dictValue" placeholder="请输入值" clearable>
                                            </vxe-input>
                                        </template>
                                    </vxe-form-item>
                                    <vxe-form-item title="是否可编辑:" field="dictIsEditable" :span=12>
                                        <template #default>
                                            <el-radio-group v-model="editForm.dictIsEditable" class="ml-4">
                                                <el-radio label="1">可编辑</el-radio>
                                                <el-radio label="0">不可编辑</el-radio>
                                            </el-radio-group>
                                        </template>
                                    </vxe-form-item>
                                </vxe-form>
                            </template>
                        </vxe-modal>
                        <el-popconfirm title="你确定要删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="delRow(row)">
                            <template #reference>
                                <vxe-button status="danger" size="mini" content="删除" round>
                                </vxe-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { dictByLike, delDict, editDict, addDict } from '@/api/dict'
import { ElMessage } from 'element-plus'

const xGrid = ref<VxeGridInstance>()
const cstType = ref([
    "客户等级",
    "服务类型"]
)
var editForm = reactive({
    dictId: '',
    dictType: '',
    dictItem: '',
    dictValue: '',
    dictIsEditable: 0
})
var modalStatus = ref(false)
var modalStatus1 = ref(false)
const gridOptions = reactive<VxeGridProps>({
    border: true,
    showOverflow: 'tooltip',
    height: 530,
    rowConfig: {
        keyField: 'dictId',
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
            { field: 'dictType', title: '类别', itemRender: {}, slots: { default: 'name_item' } },
            { field: 'dictItem', title: '条目', itemRender: {}, slots: { default: 'contact_item' } },
            { field: 'dictValue', title: '值', itemRender: {}, slots: { default: 'briefly_item' } },
            { itemRender: {}, slots: { default: 'submit_item' } },
            { itemRender: {}, slots: { default: 'create' } }
        ]
    },
    columns: [
        { field: 'dictType', title: '类别' },
        { field: 'dictItem', title: '条目' },
        { field: 'dictValue', title: '值' },
        {
            field: 'dictIsEditable', title: '是否可编辑', formatter({ cellValue }) {
                let typrFomatter = ''
                if (cellValue == 1) {
                    typrFomatter = "可编辑"
                } else {
                    typrFomatter = "不可编辑"
                }
                return typrFomatter
            }
        },
        { title: '操作', width: 150, slots: { default: 'operate' } }
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
                        dictByLike(form).then((res: any[]) => {
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

const delRow = async (row: any) => {
    delDict(row.dictId).then((result) => {
        xGrid.value?.commitProxy('query')
        if (result == "删除成功") {
            ElMessage({
                message: result,
                type: 'success',
            })
        } else {
            ElMessage.error(result)
        }
    })
}
const addDictByForm = async () => {
    addDict(editForm).then((result) => {
        xGrid.value?.commitProxy('query')
        if (result == "添加成功") {
            ElMessage({
                message: result,
                type: 'success',
            })
        } else {
            ElMessage.error(result)
        }
    })
}
const editDictByForm = async () => {
    editDict(editForm).then((result) => {
        xGrid.value?.commitProxy('query')
        if (result == "修改成功") {
            ElMessage({
                message: result,
                type: 'success',
            })
        } else {
            ElMessage.error(result)
        }
    })
}
const toEdit = async (row: any) => {
    modalStatus1.value = true;
    Object.keys(editForm).forEach(key => editForm[key] = '')
    editForm.dictId = row.dictId
    editForm.dictType = row.dictType
    editForm.dictItem = row.dictItem
    editForm.dictValue = row.dictValue
    editForm.dictIsEditable = row.dictIsEditable

}
const toAdd = async () => {
    modalStatus.value = true;
    Object.keys(editForm).forEach(key => editForm[key] = '')
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