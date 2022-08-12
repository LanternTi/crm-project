<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户信息管理">
                <el-descriptions-item label="维护客户信息，记录客户联系电话和交往记录"></el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
            <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                <template #custName_item="{ data }">
                    <vxe-input v-model="data.custName" type="text" placeholder="请输入客户名称"></vxe-input>
                </template>
                <template #custNo_item="{ data }">
                    <vxe-input v-model="data.custNo" type="text" placeholder="请输入客户编号"></vxe-input>
                </template>
                <template #custRegion_item="{ data }">
                    <el-select v-model="data.custRegion" class="m-2" placeholder="请选择地区">
                        <el-option v-for="item in area" :value="item.value" :label="item.label" />
                    </el-select>
                </template>
                <template #custManagerName_item="{ data }">
                    <vxe-input v-model="data.custManagerName" type="text" placeholder="请输入客户经理姓名"></vxe-input>
                </template>
                <template #custLevel_item="{ data }">
                    <el-select v-model="data.custLevel" class="m-2" placeholder="请选择客户等级">
                        <el-option v-for="item in lv" :value="item.value" :label="item.label" />
                    </el-select>
                </template>
                <template #submit_item>
                    <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                </template>
                <template #operate="{ row }">
                    <vxe-button size="mini" content="编辑" status="primary" round @click="openModal(1, row)">
                    </vxe-button>
                    <vxe-modal v-model="modalStatus.cust" :draggable="false" :showFooter="true" width="50%"
                        title="客户基本信息" @confirm="addCust()">
                        <vxe-form :data="formCust" custom-layout>
                            <vxe-form-item title="客户编号:" field="custNo" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custNo" disabled>
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="客户经理:" field="custManagerName" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custManagerName" disabled>
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="客户名称:" field="custName" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custName">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="地区:" field="custRegion" :span=12>
                                <template #default>
                                    <el-select v-model="formCust.custRegion" class="m-2">
                                        <el-option v-for="item in area" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="客户等级:" field="custLevel" :span=24>
                                <template #default>
                                    <el-select v-model="formCust.custLevel" class="m-2">
                                        <el-option v-for="item in lv" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="客户满意度:" field="custSatisfy" :span=12>
                                <template #default>
                                    <el-rate v-model="formCust.custSatisfy" :colors="colors" />
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="客户信用度:" field="custCredit" :span=12>
                                <template #default>
                                    <el-rate v-model="formCust.custCredit" :colors="colors" />
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="地址:" field="custAddr" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custAddr">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="邮编:" field="custZip" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custZip">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="电话:" field="custTel" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custTel">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="传真:" field="custFax" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custFax">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="网址:" field="custWebsite" :span=24>
                                <template #default>
                                    <vxe-input v-model="formCust.custWebsite">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="营业执照号:" field="custLicenceNo" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custLicenceNo">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="法人:" field="custChieftain" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custChieftain">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="注册资金(万元):" field="custBankroll" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custBankroll">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="年营业额:" field="custTurnover" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custTurnover">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="开户银行:" field="custBank" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custBank">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="银行账号:" field="custBankAccount" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custName">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="地税登记号:" field="custBankAccount" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custName">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                            <vxe-form-item title="国税登记号:" field="custLocalTaxNo" :span=12>
                                <template #default>
                                    <vxe-input v-model="formCust.custLocalTaxNo">
                                    </vxe-input>
                                </template>
                            </vxe-form-item>
                        </vxe-form>
                    </vxe-modal>
                    <vxe-button size="mini" content="联系人" status="success" round @click="openModal(2, row)">
                    </vxe-button>
                    <vxe-modal v-model="modalStatus.contact" width="70%" :draggable="false" :show-footer="false"
                        title="客户联系人管理">
                        <template #default>
                            <vxe-form :data="formCust" custom-layout>
                                <vxe-form-item title="客户编号:" field="custNo" :span=11>
                                    <template #default>
                                        <vxe-input v-model="formCust.custNo" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="客户名称:" field="custName" :span=11>
                                    <template #default>
                                        <vxe-input v-model="formCust.custName" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-button content="新建" status="success" style="position: relative;top: 7px;" :span=2>
                                </vxe-button>
                            </vxe-form>
                            <vxe-table border show-header-overflow show-overflow="tooltip"
                                :row-config="{ isHover: true }" :data="contactData"
                                :edit-config="{ trigger: 'click', mode: 'cell' }">
                                <vxe-column field="lkmName" title="姓名" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.lkmName" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="lkmSex" title="性别" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.lkmSex" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="lkmPostion" title="职位">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.lkmPostion" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="lkmTel" title="固定电话" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.lkmTel" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="lkmMobile" title="手机号码" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.lkmMobile" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="lkmMemo" title="备注" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.lkmMemo" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column title="操作">
                                    <template #default="{ row }">
                                        <vxe-button status="success" size="mini" content="编辑" @click="editContact(row)"
                                            round>
                                        </vxe-button>
                                        <el-popconfirm title="确定要删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                            @confirm="delContact(row.lkmId)">
                                            <template #reference>
                                                <vxe-button status="danger" size="mini" content="删除" round>
                                                </vxe-button>
                                            </template>
                                        </el-popconfirm>
                                    </template>
                                </vxe-column>
                            </vxe-table>
                        </template>
                    </vxe-modal>
                    <vxe-button size="mini" content="交往记录" status="info" round @click="openModal(3, row)">
                    </vxe-button>
                    <vxe-modal v-model="modalStatus.active" :draggable="false" :show-footer="false" width="50%"
                        title="客户交往记录">
                        <template #default>
                            <vxe-form :data="formCust" custom-layout>
                                <vxe-form-item title="客户编号:" field="custNo" :span=11>
                                    <template #default>
                                        <vxe-input v-model="formCust.custNo" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="客户名称:" field="custName" :span=11>
                                    <template #default>
                                        <vxe-input v-model="formCust.custName" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-button content="新建" status="success" style="position: relative;top: 7px;" :span=2>
                                </vxe-button>
                            </vxe-form>
                            <vxe-table border show-header-overflow show-overflow="tooltip"
                                :row-config="{ isHover: true }" :data="activeData"
                                :edit-config="{ trigger: 'click', mode: 'cell' }">
                                <vxe-column field="atvDate" title="时间" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <el-date-picker v-model="row.atvDate" type="date" value-format="YYYY-MM-DD" />
                                    </template>
                                </vxe-column>
                                <vxe-column field="atvPlace" title="地点" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.atvPlace" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="atvTitle" title="概要" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.atvTitle" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="atvDesc" title="详细信息" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.atvDesc" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column title="操作" :width="90">
                                    <template #default="{ row }">
                                        <vxe-button status="success" size="mini" content="编辑" @click="editActive(row)"
                                            round>
                                        </vxe-button>
                                    </template>
                                </vxe-column>
                            </vxe-table>
                        </template>
                    </vxe-modal>
                    <vxe-button size="mini" content="历史订单" status="warning" round @click="openModal(4, row)">
                    </vxe-button>
                    <vxe-modal v-model="modalStatus.Orders" :draggable="false" :show-footer="false" width="50%"
                        title="客户历史订单">
                        <template #default>
                            <vxe-form :data="formCust" custom-layout>
                                <vxe-form-item title="客户编号:" field="custNo" :span=11>
                                    <template #default>
                                        <vxe-input v-model="formCust.custNo" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item title="客户名称:" field="custName" :span=11>
                                    <template #default>
                                        <vxe-input v-model="formCust.custName" disabled>
                                        </vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-button content="新建" status="success" style="position: relative;top: 7px;" :span=2>
                                </vxe-button>
                            </vxe-form>
                            <vxe-table border show-header-overflow show-overflow="tooltip"
                                :row-config="{ isHover: true }" :data="orderData">
                                <vxe-column field="odrId" title="订单编号"></vxe-column>
                                <vxe-column field="odrDate" title="日期"></vxe-column>
                                <vxe-column field="odrAddr" title="送货地址"></vxe-column>
                                <vxe-column field="odrStatus" title="订单状态" :formatter="formatStatus"></vxe-column>
                                <vxe-column title="操作">
                                    <template #default="{ row }">
                                        <vxe-button status="success" size="mini" content="详细信息" @click="" round>
                                        </vxe-button>
                                    </template>
                                </vxe-column>
                            </vxe-table>
                        </template>
                    </vxe-modal>
                    <el-popconfirm title="确定要删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="delCustomerById(row.custNo)">
                        <template #reference>
                            <vxe-button size="mini" content="删除" status="danger" round>
                            </vxe-button>
                        </template>
                    </el-popconfirm>
                </template>
            </vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance, VxeColumnPropTypes } from 'vxe-table'
import {
    updateCustomerInfoById, selectCustomerContacts, updateCustomerContacts,
    deleteCustomerContactsById, insertCustomerContacts, selectCustomerContactsByName,
    selectCustomerInteraction, insertCustomerInteraction, deleteCustomerInteraction,
    selectCustomerInteractionById, selectCustomerInteractionInfo, UpdateCustomerInteraction,
    delCustomer
} from '@/api/cstInfo'
import { ElMessage } from 'element-plus'
var modalStatus = reactive({
    Orders: false,
    OrdersLine: false,
    active: false,
    activeEdit: false,
    contact: false,
    contactEdit: false,
    cust: false
})
var orderData = ref([])
var activeData = ref([])
var contactData = ref([])
var formCust = reactive({
    custNo: '',
    custName: '',
    custRegion: '',
    custManagerId: '',
    custManagerName: '',
    custLevel: '',
    custSatisfy: '',
    custCredit: '',
    custAddr: '',
    custZip: '',
    custTel: '',
    custFax: '',
    custWebsite: '',
    custLicenceNo: '',
    custChieftain: '',
    custBankroll: '',
    custTurnover: '',
    custBank: '',
    custBankAccount: '',
    custLocalTaxNo: '',
    custNationalTaxNo: '',
    custStatus: '',
    custCreateDate: ''
})
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
const lv = ref([
    { value: '', label: '全部' },
    { value: '5', label: '战略合作伙伴' },
    { value: '4', label: '合作伙伴' },
    { value: '3', label: '大客户' },
    { value: '2', label: '重点开发客户' },
    { value: '1', label: '普通客户' }
])

const area = ref([
    { value: '', label: '全部' },
    { value: '华北', label: '华北' },
    { value: '华南', label: '华南' },
    { value: '中南', label: '中南' },
    { value: '西北', label: '西北' }
])
const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    border: true,
    showOverflow: 'tooltip',
    height: 530,
    rowConfig: {
        keyField: 'custNo',
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
            { span: 7, field: 'custName', title: '客户名称', itemRender: {}, slots: { default: 'custName_item' } },
            { span: 8, field: 'custNo', title: '客户编号', itemRender: {}, slots: { default: 'custNo_item' } },
            { span: 7, field: 'custRegion', title: '地区', itemRender: {}, slots: { default: 'custRegion_item' } },
            { span: 7, field: 'custManagerName', title: '客户经理', itemRender: {}, slots: { default: 'custManagerName_item' } },
            { span: 7, field: 'custLevel', title: '客户等级', itemRender: {}, slots: { default: 'custLevel_item' } },
            { span: 2, itemRender: {}, slots: { default: 'submit_item' } }
        ]
    },
    columns: [
        { field: 'custNo', title: '客户编号' },
        { field: 'custName', title: '客户名称' },
        { field: 'custRegion', title: '地区' },
        { field: 'custManagerName', title: '客户经理' },
        {
            field: 'custLevel', title: '客户等级', formatter({ cellValue }) {
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
        },
        { field: 'custCreateDate', title: '建立时间' },
        { title: '操作', width: 390, slots: { default: 'operate' } }
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
                        selectCustomerContactsByName(form).then((res: any[]) => {
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
const formatStatus: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
    if (cellValue == 1) {
        return '未回款'
    } else {
        return '已回款'
    }
}
const openModal = (id: number, row?: any) => {
    if (id == 4) {
        Object.keys(formCust).forEach(key => { formCust[key] = row[key] || formCust[key] });
        selectCustomerInteractionById(row).then((result) => {
            orderData.value = result
        })
        modalStatus.Orders = true
    } else if (id == 1) {
        Object.keys(formCust).forEach(key => { formCust[key] = row[key] || formCust[key] });
        modalStatus.cust = true
    } else if (id == 3) {
        Object.keys(formCust).forEach(key => { formCust[key] = row[key] || formCust[key] });
        selectCustomerInteraction(row).then((result) => {
            activeData.value = result
        })
        modalStatus.active = true
    } else if (id == 2) {
        Object.keys(formCust).forEach(key => { formCust[key] = row[key] || formCust[key] });
        selectCustomerContacts(row).then((result) => {
            contactData.value = result
        })
        modalStatus.contact = true
    }

}


const delCustomerById = async (id: number) => {
    delCustomer(id).then((result: any) => {
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
const addCust = async () => {
    updateCustomerInfoById(formCust).then((result: any) => {
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
const delContact = async (id: number) => {
    deleteCustomerContactsById(id).then((result: any) => {
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
const editContact = async (row: any) => {
    updateCustomerContacts(row).then((result: any) => {
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
const editActive = async (row: any) => {
    UpdateCustomerInteraction(row).then((result: any) => {
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