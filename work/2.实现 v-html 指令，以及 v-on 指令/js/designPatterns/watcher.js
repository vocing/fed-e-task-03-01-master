// 发布者 - 目标
class dep {
  constructor() {
    this.subs = []
  }
  //
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发布通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

// 观察者
class watcher {
  update() {
    console.log('update')
  }
}

let d = new dep()

let w = new watcher()

d.addSub(w)

d.notify()
