import './assets/main.scss'
import locale from 'element-plus/dist/locale/zh-cn.js'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router"


import App from './App.vue'
import { createPinia } from 'pinia'
import {createPersistedState} from 'pinia-persistedstate-plugin'
const pinia = createPinia();
const persist = createPersistedState()
pinia.use(persist)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app')
