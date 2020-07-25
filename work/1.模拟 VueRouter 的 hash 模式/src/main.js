import Vue from 'vue'
import App from './App.vue'

import Router from '../theory/vueRouter.js'
Vue.use(Router)
const router = new Router({
    data: {
        current: '/'
    },
    routes: [{
        path: "/",
        name: "hello",
        component: () =>
            import(
                "./views/HelloWorld.vue"
            )
    }, {
        path: "/about",
        name: "about",
        component: () =>
            import(
                "./views/about.vue"
            )
    }, {
        path: "/404",
        name: "404",
        component: () =>
            import(
                "./views/404.vue"
            )
    }, ]
})


Vue.config.productionTip = false
new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app')