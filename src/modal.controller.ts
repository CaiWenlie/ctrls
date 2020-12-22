// 通用弹窗控制器
export default class ModalController<T = any, P = T> {
  visible = false
  data: T | null = null
  callback?: ((res?: P) => any) | null

  open(data?: T, callback?: (res?: P) => any) {
    if (data) {
      this.data = data
    }
    if (callback) {
      this.callback = callback
    }
    this.visible = true
  }

  close() {
    this.visible = false
    this.data = null
    this.callback = null
  }
}
