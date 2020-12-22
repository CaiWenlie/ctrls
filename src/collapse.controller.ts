import ModalController from './modal.controller'

// 通用折叠面板控制器
export default class CollapseController<T = any> extends ModalController<T> {
  // 构造函数传入初始data
  constructor(data: T) {
    super()
    this.data = data
  }

  // 覆盖close方法，不清空data
  close() {
    this.visible = false
    this.callback = null
  }
}
