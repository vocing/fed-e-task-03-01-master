import { h, init } from 'snabbdom'

import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

let patch = init([eventlisteners, style])

let vnode = h(
  'div',
  {
    style: {
      backgroundColor: 'red',
    },
    on: {
      click: eventHandler,
    },
  },
  [h('h1', 'hello !!!!'), h('p', '这是一个p标签')]
)

function eventHandler() {
  console.log('点我')
}

let app = document.querySelector('#app')
patch(app, vnode)
