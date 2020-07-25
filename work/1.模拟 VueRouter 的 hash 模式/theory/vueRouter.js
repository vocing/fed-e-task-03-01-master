let _Vue = null
export default class VueRouter {
    static install(Vue) {
        // 1. 判断是否已安装插件
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true
        // 2. Vue构造函数记录到全局变量
        _Vue = Vue
        // 3. 创建实例的时候传入的router对象注入到Vue实例上
        // 混入
        _Vue.mixin({
            beforeCreate() {
                // 判断实例中是否有router属性, 执行替换
                // 只有实例才有router属性, 组件是没有该属性的
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                }
            },
        })
    }

    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/',
        })
        this.init()
    }

    init() {
        this.createRouterMap()
        this.initComponents(_Vue)
        this.initEvent()
    }

    createRouterMap() {
        // 遍历所有路由规则, 解析规则为键值对形式存储到routeMap中
        this.options.routes.forEach((route) => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents(Vue) {
        Vue.component('router-link', {
            props: {
                to: String,
            },
            // 使用template时, 需要vue.config.js中runtimeCompile设置为true(开启运行时编译器)
            // 编译器就是将template编译为render形式
            // template: '<a :href="to"><slot></slot></a>',
            render(h) {
                return h(
                    'a', {
                        attrs: {
                            href: this.to,
                        },
                        on: {
                            click: this.clickHandler,
                        },
                    },
                    [this.$slots.default]
                )
            },
            methods: {
                clickHandler(e) {
                    // 改变浏览器地址栏
                    window.location.hash = `#${this.to}`
                    // 记录data.current
                    console.log(this)
                    this.$router.data.current = this.to
                    e.preventDefault()
                },
            },
        })

        const self = this
        Vue.component('router-view', {
            render(h) {
                console.log(self.routeMap)
                const component = self.routeMap[self.data.current]
                return h(component)
            },
        })
    }

    initEvent() {
        const hashEvent = () => {
            this.data.current = window.location.hash.substr(1).split('?')[0]
        }
        hashEvent()
        window.addEventListener('hashchange', () => {
            hashEvent()
        })
    }
}