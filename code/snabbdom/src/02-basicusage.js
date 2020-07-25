import { h, thunk, init } from 'snabbdom'
// console.log(h, thunk, init)

let patch = init([])

let vnode = h('div#comtainer.cls', [
  h('h1', 'hello !!!!'),
  h('p', '这是一个p标签'),
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)
setTimeout(() => {
  vnode = h('div#comtainer.cls', [h('h1', 'hello ~~~~~'), h('p', 'hello p')])
  patch(oldVnode, vnode)
  patch(oldVnode, h('!'))
}, 2000)
