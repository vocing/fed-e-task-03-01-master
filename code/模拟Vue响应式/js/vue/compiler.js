// 内部Watcher方法依赖watcher.js
class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板, 处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 判断node节点是否有子节点, 如果有子节点, 要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点, 处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      let attrName = attr.name
      if (this.isDerective(attrName)) {
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  // 获取指令对应的方法来执行
  update(node, key, attrName) {
    // let updateFn = this[attrName + 'Updater']
    // updateFn && updateFn.call(this, node, this.vm[key], key)
    const method = attrName + 'Updater'
    this[method] && this[method](node, this.vm[key], key)
  }
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 双向绑定注册
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  // 编译文本节点, 处理差值表达式
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象, 数据改变时更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断元素是否是指令
  isDerective(attrName) {
    return attrName.startsWith('v-')
  }
  // nodeType === 3 => 文本节点, nodeType === 2 => 属性节点, nodeType === 1 => 元素节点
  // nodeType 其他, 参见: https://www.w3school.com.cn/jsref/prop_node_nodetype.asp
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
