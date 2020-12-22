import { cloneDeep, isEqual } from 'lodash'

// 通用编辑控制器
export default class EditorController<T = number> {
  data: T | null = null
  snapshot: T | null = null

  get changed() {
    return !isEqual(this.data, this.snapshot)
  }

  setData(data: T) {
    this.data = cloneDeep(data)
    this.takeSnapshot()
  }

  takeSnapshot() {
    this.snapshot = cloneDeep(this.data)
  }

  exit() {
    this.data = null
    this.snapshot = null
  }
}
