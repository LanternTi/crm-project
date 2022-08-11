import { createApp } from 'vue'
import './style.css'
import { router } from 'route/routes'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
function useTable(app) {
    app.use(VXETable)
}
app.use(router, ElMessage, ElMessageBox).use(useTable).use(pinia).mount('#app')
