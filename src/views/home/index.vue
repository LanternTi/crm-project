<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Myside></Myside>
            </el-aside>
            <el-container>
                <el-header height="50px">
                    <NavBar></NavBar>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
    <div id="info-box">
        <el-card shadow="always" style="height: 18rem;">
            <el-row>
                <el-col :offset="0">
                    <el-avatar :size="80" src="src\assets\T1.jpg" style="border:1px solid rgba(3, 3, 3, 0.1);" />
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :offset="0">
                    <el-tag class="mx-1" size="large" effect="plain">{{ user.userName }}</el-tag>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :offset="0" :span="10">
                    <el-tag class="mx-1" size="large" effect="plain" type="success">{{ moment().year() + '年' }}</el-tag>
                </el-col>
                <el-col :offset="0" :span="4">
                    <el-tag class="mx-1" size="large" effect="plain" type="warning">{{ moment().month() + 1 + '月' }}
                    </el-tag>
                </el-col>
                <el-col :offset="0" :span="10">
                    <el-tag class="mx-1" size="large" effect="plain" type="danger">{{ moment().date() + '日' }}
                    </el-tag>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col>
                    <el-tag class="mx-1" size="large" effect="plain" type="info">{{ yiyan }}
                    </el-tag>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/views/home/components/NavBar.vue"
import Myside from "@/views/home/components/Myside.vue"
import * as moment from 'moment'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useMainStore } from "@/store"
import { ref } from "vue"

var yiyan = ref()
axios.get('https://v1.hitokoto.cn/?c=i&encode=text')
    .then(res => {
        yiyan.value = res.data
    })
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore);
</script>

<style lang="css">
html,
body,
#app,
.common-layout,
.el-container,
.el-aside {
    height: 100%;
}

body {
    place-items: unset;
}

#app {
    margin: unset;
    width: 100%;
    padding: unset;

}

.el-aside {
    background-color: #001529;
}

#info-box {
    width: 15%;
    position: absolute;
    right: 0px;
    top: 0px;
}
</style>