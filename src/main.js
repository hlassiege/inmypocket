import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp, h } from 'vue'
import configuration from './config'
import routes from './routes'

const SimpleRouterApp = {
    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        ViewComponent () {
            const matchingPage = routes[this.currentRoute] || '404'
            return require(`./pages/${matchingPage}.vue`).default
        }
    },

    render () {
        return h(this.ViewComponent)
    },

    created () {
        window.addEventListener('popstate', () => {
            this.currentRoute = window.location.pathname
        })
    }
}


createApp(SimpleRouterApp)
.provide('configuration', configuration)
.mount('#app')
