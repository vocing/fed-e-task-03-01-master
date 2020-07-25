// 事件触发器
class eventEmitter {
  constructor() {
    // { click: [fn1, fn2], change: [fn] }
    this.subs = Object.create(null)
  }
  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }

  $emit(eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach((handler) => {
        handler()
      })
    }
  }
}

// 测试

let em = new eventEmitter()
em.$on('click', () => {
  console.log('click1')
})

em.$on('click', () => {
  console.log('click2')
})
em.$emit('click')
