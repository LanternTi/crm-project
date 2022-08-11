<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="销售机会管理">
                <el-descriptions-item label="创建和维护销售机会"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #name_item="{ data }">
                    <vxe-input v-model="data.chcCustName" type="text" placeholder="请输入客户名称"></vxe-input>
                </template>
                <template #contact_item="{ data }">
                    <vxe-input v-model="data.chcLinkman" type="text" placeholder="请输入联系人名称"></vxe-input>
                </template>
                <template #briefly_item="{ data }">
                    <vxe-input v-model="data.chcTitle" type="text" placeholder="请输入概要"></vxe-input>
                </template>
                <template #submit_item>
                    <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                </template>
                <template #create>
                    <vxe-button status="success" content="新建" @click="toAdd()"></vxe-button>
                    <vxe-modal v-model="dialogStatus.dialogCreate" show-footer :draggable="false" width="50%"
                        title="销售机会添加" @confirm="addRow(editForm)">
                        <template #default>
                            <vxe-form :data="editForm" custom-layout>
                                <vxe-form-item title="客户名称:" field="chcCustName" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcCustName" placeholder="请输入客户名称" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="机会来源:" field="chcSource" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcSource" placeholder="请输入机会来源" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="成功几率:" field="chcRate" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcRate" placeholder="请输入成功几率" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="联系人:" field="chcLinkman" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcLinkman" placeholder="请输入联系人名称" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="联系电话:" field="chcTel" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcTel" placeholder="请输入联系人电话" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="概要:" field="chcTitle" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcTitle" placeholder="请输入概要" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="机会描述:" field="chcDesc" :span="24">
                                    <template #default>
                                        <vxe-textarea v-model="editForm.chcDesc" placeholder="请输入机会描述" rows="3"
                                            cols="40">
                                        </vxe-textarea>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建人:" field="chcCreateBy" :span="12">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcCreateBy" placeholder="请输入创建人" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建时间:" field="chcCreateDate" :span="12">
                                    <template #default>
                                        <el-date-picker v-model="editForm.chcCreateDate" type="date"
                                            placeholder="请选择创建日期" value-format="YYYY-MM-DD" />
                                    </template>
                                </vxe-form-item>
                            </vxe-form>
                        </template>
                    </vxe-modal>
                </template>
                <template #operate="{ row }">
                    <vxe-button status="primary" size="mini" content="分配" round @click="toDis(row)"></vxe-button>
                    <vxe-modal v-model="dialogStatus.dialogDis" show-footer :mask="false" :draggable="false" width="50%"
                        title="销售机会编辑" @confirm="disRow(editForm)">
                        <template #default>
                            <vxe-form :data="editForm" custom-layout>
                                <vxe-form-item title="客户名称:" field="chcCustName">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcCustName" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="机会来源:" field="chcSource">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcSource" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="成功几率:" field="chcRate">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcRate" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="联系人:" field="chcLinkman">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcLinkman" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="联系电话:" field="chcTel">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcTel" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="概要:" field="chcTitle">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcTitle" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="机会描述:" field="chcDesc">
                                    <template #default>
                                        <vxe-textarea v-model="editForm.chcDesc" rows="3" cols="40" disabled>
                                        </vxe-textarea>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建人:" field="chcCreateBy">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcCreateBy" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建时间:" field="CharacterData">
                                    <template #default>
                                        <el-date-picker v-model="editForm.chcCreateDate" type="date"
                                            value-format="YYYY-MM-DD" disabled />
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="指派人:" field="CharacterData">
                                    <template #default>
                                        <el-select v-model="editForm.chcDueTo" class="m-2" placeholder="请选择指派人">
                                            <el-option v-for="item in DueTo" :key="item" :label="item" :value="item" />
                                        </el-select>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="分配时间:" field="chcDueDate">
                                    <template #default>
                                        <el-date-picker v-model="editForm.chcDueDate" type="date"
                                            value-format="YYYY-MM-DD" placeholder="请选择分配时间" />
                                    </template>
                                </vxe-form-item>
                            </vxe-form>
                        </template>
                    </vxe-modal>
                    <vxe-button status="success" size="mini" content="编辑" round @click="toEdit(row)">
                    </vxe-button>
                    <vxe-modal v-model="dialogStatus.dialogEdit" show-footer :mask="false" :draggable="false"
                        width="50%" title="销售机会编辑" @confirm="editRow(editForm)">
                        <template #default>
                            <vxe-form :data="editForm" custom-layout>
                                <vxe-form-item title="客户名称:" field="chcCustName">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcCustName" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="机会来源:" field="chcSource">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcSource" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="成功几率:" field="chcRate">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcRate" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="联系人:" field="chcLinkman">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcLinkman" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="联系电话:" field="chcTel">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcTel" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="概要:" field="chcTitle">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcTitle" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="机会描述:" field="chcDesc">
                                    <template #default>
                                        <vxe-textarea v-model="editForm.chcDesc" rows="3" cols="40">
                                        </vxe-textarea>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建人:" field="chcCreateBy">
                                    <template #default>
                                        <vxe-input v-model="editForm.chcCreateBy" clearable>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="创建时间:" field="CharacterData">
                                    <template #default>
                                        <el-date-picker v-model="editForm.chcCreateDate" type="date"
                                            value-format="YYYY-MM-DD" />
                                    </template>
                                </vxe-form-item>
                            </vxe-form>
                        </template>
                    </vxe-modal>
                    <el-popconfirm title="你确定要删除吗?" @confirm="delRow(row)" confirm-button-text="确认"
                        cancel-button-text="取消">
                        <template #reference>
                            <vxe-button status="danger" size="mini" content="删除" round></vxe-button>
                        </template>
                    </el-popconfirm>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { salByLike, delChance, editChance, addChance, disChance } from '@/api/sal'
import { ElMessage } from 'element-plus'

const DueTo = ref([
    "张三",
    "李四",
    "王五",
    "赵六"
])
var dialogStatus = reactive({
    dialogEdit: false,
    dialogDis: false,
    dialogCreate: false
})
var editForm = reactive({
    chcCustName: '',
    chcSource: '',
    chcRate: '',
    chcLinkman: '',
    chcTel: '',
    chcTitle: '',
    chcDesc: '',
    chcCreateBy: '',
    chcCreateDate: '',
    chcId: '',
    chcDueTo: '',
    chcDueDate: ''
})
const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    border: true,
    height: 530,
    showOverflow: 'tooltip',
    rowConfig: {
        keyField: 'chcId',
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
            { field: 'chcCustName', title: '客户名称', itemRender: {}, slots: { default: 'name_item' } },
            { field: 'chcLinkman', title: '联系人名称', itemRender: {}, slots: { default: 'contact_item' } },
            { field: 'chcTitle', title: '概要', itemRender: {}, slots: { default: 'briefly_item' } },
            { itemRender: {}, slots: { default: 'submit_item' } },
            { itemRender: {}, slots: { default: 'create' } }
        ]
    },
    columns: [
        { field: 'chcCustName', title: '客户名称' },
        { field: 'chcTitle', title: '概要' },
        { field: 'chcLinkman', title: '联系人' },
        { field: 'chcTel', title: '联系电话', showOverflow: true },
        { field: 'chcCreateDate', title: '创建时间' },
        { title: '操作', width: 210, slots: { default: 'operate' } }
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
                        salByLike(form).then((res: any[]) => {
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
const toDis = async (row: any) => {
    editForm.chcCustName = row.chcCustName
    editForm.chcSource = row.chcSource
    editForm.chcRate = row.chcRate
    editForm.chcLinkman = row.chcLinkman.trim()
    editForm.chcTel = row.chcTel
    editForm.chcTitle = row.chcTitle
    editForm.chcDesc = row.chcDesc
    editForm.chcCreateBy = row.chcCreateBy
    editForm.chcCreateDate = row.chcCreateDate
    editForm.chcId = row.chcId
    editForm.chcDueTo = row.chcDueTo
    editForm.chcDueDate = row.chcDueDate
    dialogStatus.dialogDis = true
}
const disRow = async (editForm: any) => {
    disChance(editForm).then((result) => {
        if (result == "分配成功") {
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
const toAdd = async () => {
    Object.keys(editForm).forEach(key => editForm[key] = '')
    dialogStatus.dialogCreate = true
}
const addRow = async (editForm: any) => {
    addChance(editForm).then((result) => {
        if (result == "添加成功") {
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
const editRow = async (editForm: any) => {
    editChance(editForm).then((result) => {
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
const toEdit = async (row: any) => {
    editForm.chcCustName = row.chcCustName
    editForm.chcSource = row.chcSource
    editForm.chcRate = row.chcRate
    editForm.chcLinkman = row.chcLinkman.trim()
    editForm.chcTel = row.chcTel
    editForm.chcTitle = row.chcTitle
    editForm.chcDesc = row.chcDesc
    editForm.chcCreateBy = row.chcCreateBy
    editForm.chcCreateDate = row.chcCreateDate
    editForm.chcId = row.chcId
    dialogStatus.dialogEdit = true

}
const delRow = async (row: any) => {
    delChance(row.chcId).then((result) => {
        if (result == "删除成功") {
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