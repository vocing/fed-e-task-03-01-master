import { h, thunk, init } from 'snabbdom'
// console.log(h, thunk, init)

let patch = init([])

let vnode = h('div#comtainer.cls', 'hello world')

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

vnode = h('div', 'hello snabbdom')

patch(oldVnode, vnode)
