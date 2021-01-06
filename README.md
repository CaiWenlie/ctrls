### ctrls
Excellent frontend view controllers. Simpler way to control your views.

`ctrls`集合了多个前端视图控制器，帮助你以简洁的形式组织前端视图。

### list
- Modal Controller
- Collapse Controller
- List Controller
- Paging Controller
- Editor Controller

### Modal Controller
弹窗控制器，控制弹窗显示与关闭，处理数据传递与回调。

***vue使用示例***

1. 创建控制器实例。因为弹窗使用场景的唯一性，我们可以直接输出一个全局唯一的实例，用来控制特定弹窗。
```js
import { ModalController } from 'ctrls'

// 输出控制器实例
export const myModalController = new ModalController()

```
2. 弹窗的实现。弹窗中可以处理一些业务逻辑，数据通过`controller.open()`传递进来，在完成业务逻辑处理之后，通过`controller.callback()`通知回调。这样就避免了复杂的`prop`参数传递，使得弹窗完全独立，不依赖任何`prop`和`event`。
```vue
<template>
  <Modal v-model="controller.visible">
    <div>{{ controller.data }}</div>
    <button @click="submit">提交</button>
  </Modal>
</template>
<script>
export default {
  data () {
    return {
      // 在data中绑定controller会让其属性变得reactive
      controller: myModalController
    }
  },
  methods: {
    submit () {
      // 处理业务逻辑
      // ...

      // 根据你的需求，在合适的时机发起回调
      if (this.controller.callback) {
        this.controller.callback() // 必要时可以传递参数
      }
      // 关闭
      this.controller.close()
    }
  }
}
</script>
```
3. 弹窗的挂载。由于这个弹窗是完全独立的，你可以将他挂载到任何地方，一般可以挂在弹窗相关的路由页面上，甚至也可以挂到vue根组件。
```
<PageView>
  <MyModal></MyModal>
</PageView>
```

4. 弹窗的使用。你可以在任何地方调用`controller.open()`，他可以接收两个可选参数`(data, callback)`，`data`是弹窗所需的数据，`callback`是回调
```js
// 打开弹窗
myModalController.open()

// 打开弹窗，并传递data参数
myModalController.open({ id: 1 })

// 打开弹窗，并传递data和callback
myModalController.open({ id: 1 }, () => {
  console.log('done')
})

// 打开弹窗，并传递data和一个带参数的callback
myModalController.open({ id: 1 }, (msg) => {
  console.log(msg)
})

// 关闭弹窗（同时 data和callback会被清空）
myModalController.close()

```
5. 在组件中调用弹窗
```vue
<template>
  <div>
    <button @click="myModalController.open()">open</button>
    <ul>
      <li v-for="item in list" @click="onClickItem(item)">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
// 引入控制器
import { myModalController } from './myModal.js'
export default {
  data () {
    return {
      // 挂载到data，以便在模版中调用
      myModalController,
      list: [1, 2, 3]
    }
  },
  methods: {
    // 刷新列表数据
    refreshList () {
      this.list = [2, 3, 4]
    },
    // 点击item
    onClickItem (item) {
      myModalController.open(item, () => this.refreshList())
    }
  }
}
</script>
```

***react使用示例***
在react中可以借助`mobx`，使得`controller`的属性改变可以引起视图刷新。更多帮助请查看`mobx`文档。
```js
import { ModalController } from 'ctrls'
import { observable } from 'mobx'

// 输出控制器实例
export const myModalController = observable(new ModalController())
```
