// 内部Dep方法依赖dep.js
class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 响应判断
  walk(data) {
    // 为对象的才添加响应
    if (!data || typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    // 收集依赖并发送通知
    let dep = new Dep()
    // 属性值响应判断
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set: (newValue) => {
        if (newValue === val) {
          return
        }
        val = newValue
        // 修改值响应判断
        this.walk(newValue)
        // 发送通知
        dep.notify()
      },
    })
  }
}
