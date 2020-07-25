一、简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。
let vm = new Vue({
el: '#el'
data: {
o: 'object',
dog: {}
},
method: {
clickHandler () {
// 该 name 属性是否是响应式的
this.dog.name = 'Trump'
}
}
})

答：1.不是, Vue 为 data 添加到 defineProperty 是针对 data 中已定义的各后代属性的, 新增在引用类型(此处是对象 dog)上的属性, 并不会导致 dog 对象的值(内存地址)的变更, 也就不会触发 Vue 对属性的监听设置. 
    2.可以用 Vue.set 或组件内使用 this.$set 设置成响应式数据. 原理: Vue.set函数, 接受三个参数对象、键名、键值, 该函数会对传入的对象及其后代属性中的对象添加defineProperty(以defineReactive的方式).

2、请简述 Diff 算法的执行过程
答: 依次对比节点及后代节点, 仅对比同一层级的节点, 一边比较一边使用patch给真实DOM打补丁. 同层节点循环判断方式如下: 
    1.首个子节点是否相同: patchVnode, (新、旧)首个子节点的索引指向下一个子节点;
    2.末尾子节点是否相同: patchVnode, (新、旧)末尾子节点的索引指向上一个子节点;
    3.旧节点首个子节点是否与新节点末尾子节点相同: patchVnode, 旧首个子节点的索引指向下一个子节点, 新末尾子节点的索引指向上一个子节点;
    4.旧节点末尾子节点是否与新节点首个子节点相同: patchVnode, 旧末尾子节点的索引指向上一个子节点, 新首个子节点的索引指向下一个子节点;
    5.根据key值索引对比: 
        新建一个以旧子节点key为键、索引为值的对象,
        判断新子节点的key, 是否有对应索引: 否 => 插入新节点, 是 => patchVnode、旧子节点的key设为undefined、插入新节点,
        新节点首个子节点的索引指向下一个子节点;


二、编程题
1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
答: a. 改变浏览器地址栏事件由history.pushSate修改为: window.location.hash = `#${this.to}`
    b. initEvent popstate修改为hashchange, 事件执行修改为:  this.data.current = window.location.hash.substr(1).split('?')[0]
    参见文件: ./1.模拟 VueRouter 的 hash 模式/theory/vueRouter.js  行: 70, 90

2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
答: 实现v-on功能实现了入参、$event转换, 未实现for循环入参的处理等.
    参见文件: ./2.实现 v-html 指令，以及 v-on 指令/js/vue/compiler.js  行: 45, 55

3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：
答: 参见文件: ./3.Snabbdom, 对方法逻辑做了处理, 样式、基础数据直接由示例中取用.
