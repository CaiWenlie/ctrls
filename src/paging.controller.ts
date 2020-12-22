import ListController, { Res, TListService } from './list.controller'

type TPagingService<T, P> = Omit<TListService<T, P>, 'list'> & { list: (params: P & Partial<Paging>) => Promise<PagingRes<T[]>> }

// 通用list翻页控制器
// T: list item类型
// P: list param类型
export default class PagingController<T = any, P = any> extends ListController<T, P> {
  service: TPagingService<T, P>
  paging: Paging = {
    itemTotal: 0,
    pageIndex: 1,
    pageSize: 10
  }

  constructor(service: TPagingService<T, P>, params: P) {
    super(service, params)
    this.service = service
  }

  async fetchList(data?: Partial<Paging> & Partial<P>) {
    const params = { ...this.params, ...this.paging, ...data }
    Object.keys(params).forEach(key => {
      if (!['itemTotal', 'pageIndex', 'pageSize'].includes(key)) {
        (this.params as any)[key] = (params as any)[key]
      }
    })
    this.loading = true
    const res = await this.service.list(params)
      .finally(() => {
        this.loading = false
      })
    const { itemTotal, pageIndex } = res
    const { pageSize } = params
    this.paging = { itemTotal, pageIndex, pageSize }
    this.list = res.data
    return res
  }
}

export interface Paging {
  pageSize: number
  pageIndex: number
  itemTotal: number
}

export type PagingParams = Partial<Paging>
export type PagingRes<T = any> = Res<T> & Paging
