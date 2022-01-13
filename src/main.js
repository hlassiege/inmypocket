import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import configuration from './config'
import routes from './routes'
import App from './App'


const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
})


createApp(App)
.use(router)
.provide('configuration', configuration)
.mount('#app')
