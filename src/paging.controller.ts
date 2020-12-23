import ListController, { TListService } from './list.controller'

type TPagingService<T, P> = Omit<TListService<T, P>, 'list'> & { list: (params: P & Partial<Pagination>) => Promise<any> }

// 通用list翻页控制器
// T: list item类型
// P: list param类型
export default class PagingController<T = any, P = any> extends ListController<T, P> {
  service: TPagingService<T, P>
  _pagination: Pagination = {
    itemTotal: 0,
    pageIndex: 1,
    pageSize: 10
  }

  constructor(service: TPagingService<T, P>, params: P) {
    super(service, params)
    this.service = service
  }

  get pagination() {
    return this.paginationGetter(this._pagination)
  }

  // to be customised
  paginationGetter(pagination: Pagination) {
    return {
      itemTotal: pagination.itemTotal,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize
    }
  }

  // to be customised
  resReader(res: any) {
    return {
      list: res.data,
      itemTotal: res.itemTotal,
      pageIndex: res.pageIndex,
      pageSize: res.pageSize
    }
  }

  async fetchList(data?: Partial<Pagination> & Partial<P>) {
    const params = { ...this.params, ...this.pagination, ...data }
    Object.keys(params).forEach(key => {
      if (!Object.keys(this.pagination).includes(key)) {
        (this.params as any)[key] = (params as any)[key]
      }
    })
    this.loading = true
    const res = await this.service.list(params)
      .finally(() => {
        this.loading = false
      })
    const { list, itemTotal, pageIndex, pageSize } = this.resReader(res)
    this._pagination = { itemTotal, pageIndex, pageSize }
    this.list = list
    return res
  }
}

export interface Pagination {
  pageSize: number
  pageIndex: number
  itemTotal: number
}
