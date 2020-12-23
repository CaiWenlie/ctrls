import ListController from './list.controller';
// 通用list翻页控制器
// T: list item类型
// P: list param类型
export default class PagingController extends ListController {
    constructor(service, params) {
        super(service, params);
        this._pagination = {
            itemTotal: 0,
            pageIndex: 1,
            pageSize: 10
        };
        this.service = service;
    }
    get pagination() {
        return this.paginationGetter(this._pagination);
    }
    // to be customised
    paginationGetter(pagination) {
        return {
            itemTotal: pagination.itemTotal,
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize
        };
    }
    // to be customised
    resReader(res) {
        return {
            list: res.data,
            itemTotal: res.itemTotal,
            pageIndex: res.pageIndex
        };
    }
    async fetchList(data) {
        const params = { ...this.params, ...this.pagination, ...data };
        Object.keys(params).forEach(key => {
            if (!Object.keys(this.pagination).includes(key)) {
                this.params[key] = params[key];
            }
        });
        this.loading = true;
        const res = await this.service.list(params)
            .finally(() => {
            this.loading = false;
        });
        const { list, itemTotal, pageIndex } = this.resReader(res);
        const { pageSize } = params;
        this._pagination = { itemTotal, pageIndex, pageSize };
        this.list = list;
        return res;
    }
}
//# sourceMappingURL=paging.controller.js.map