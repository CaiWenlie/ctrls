import { cloneDeep } from 'lodash'

// 通用list控制器(无翻页)
// T: list item类型
// P: list param类型
export default class ListController<T = any, P = any> {
  service: TListService<T, P>
  params: P
  defaultParams: P
  list: T[] = []
  loading = false
  selected: T[] = []

  constructor(service: TListService<T, P>, params: P) {
    this.service = service
    this.params = params
    this.defaultParams = cloneDeep(params)
  }

  setParams(params: Partial<P>) {
    this.params = { ...this.params, ...params }
  }

  resetParams() {
    this.params = cloneDeep(this.defaultParams)
  }

  async fetchList(params?: Partial<P>) {
    params = { ...this.params, ...params }
    this.params = params as P
    this.loading = true
    const res = await this.service.list(params)
      .finally(() => {
        this.loading = false
      })
    this.list = this.resReader(res).list
    return res
  }

  // to be customised
  resReader(res: any) {
    return {
      list: res.data
    }
  }

  async fetchDetail(data: Partial<T>) {
    return this.service.detail!(data)
  }

  async create(data: Partial<T>) {
    await this.service.create!(data)
    this.fetchList()
  }

  async remove(data: Partial<T>) {
    await this.service.remove!(data)
    this.fetchList()
  }

  async update(data: Partial<T>) {
    await this.service.update!(data)
    this.fetchList()
  }

  // onSelect(selection: T[]) {
  //   this.selected = selection
  //   this.setSelection(selection)
  // }

  // setSelection(selection: T[]) {
  //   this.list.forEach((item: any) => {
  //     const checked = !!selection.find((i: any) => i.id === item.id)
  //     Vue.set(item, '_checked', checked)
  //   })
  // }
}

// list增删改查
// T: list item类型
// P: list param类型
export interface TListService<T, P> {
  list(params: P & any): Promise<any>
  create?(data: Partial<T> & any): Promise<any>
  remove?(data: Partial<T> & any): Promise<any>
  update?(data: Partial<T> & any): Promise<any>
  detail?(data: Partial<T> & any): Promise<any>
}
