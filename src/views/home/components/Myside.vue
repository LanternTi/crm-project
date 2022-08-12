<template>
    <el-container>
        <el-col>
            <h2>CRM Admin</h2>
            <el-menu class="el-menu-vertical-demo" router :default-active="route.path" background-color="#001529"
                text-color="#9ca4ab" active-text-color="#ffffff" unique-opened>
                <el-sub-menu index="1" v-if="user.userRoleId != 4">
                    <template #title>
                        <span>营销管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/salesManage">
                            销售机会管理
                        </el-menu-item>
                        <el-menu-item index="/customerExploitation">
                            客户开发计划
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="2" v-if="user.userRoleId == 3 || user.userRoleId == 1">
                    <template #title>
                        <span>客户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/customerInfoManage">
                            客户信息管理
                        </el-menu-item>
                        <el-menu-item index="/customerLossManage">
                            客户流失管理
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="3" v-if="user.userRoleId != 4">
                    <template #title>
                        <span>服务管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/createService">
                            服务创建
                        </el-menu-item>
                        <el-menu-item index="/disService">
                            服务分配
                        </el-menu-item>
                        <el-menu-item index="/doService">
                            服务处理
                        </el-menu-item>
                        <el-menu-item index="/feedback">
                            服务反馈
                        </el-menu-item>
                        <el-menu-item index="/archive">
                            服务归档
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4" v-if="user.userRoleId != 3">
                    <template #title>
                        <span>统计报表</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/contribution">
                            客户贡献分析
                        </el-menu-item>
                        <el-menu-item index="/constitute">
                            客户构成分析
                        </el-menu-item>
                        <el-menu-item index="/serve">
                            客户服务分析
                        </el-menu-item>
                        <el-menu-item index="/loss">
                            客户流失分析
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="5" v-if="user.userRoleId == 1">
                    <template #title>
                        <span>基础数据</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/dict">
                            数据字典管理
                        </el-menu-item>
                        <el-menu-item index="/product">
                            查询产品信息
                        </el-menu-item>
                        <el-menu-item index="/storage">
                            查询库存
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-col>
    </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from "@/store"
const route = useRoute()

const mainStore = useMainStore()
const { user } = storeToRefs(mainStore);
</script>

<style lang="css">
.el-menu-item:hover,
.el-sub-menu :hover {
    color: #ffffff;
}

.el-menu {
    border-right: none;
}

.el-menu-item.is-active {
    border-left: solid 3px #26a1fa;
}

h2 {
    text-transform: uppercase;
    margin: 15px 0;
    color: #1890ff;
    font: bold 200% Consolas, Monaco, monospace;
}
</style>