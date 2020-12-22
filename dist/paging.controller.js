import ListController from './list.controller';
// 通用list翻页控制器
// T: list item类型
// P: list param类型
export default class PagingController extends ListController {
    constructor(service, params) {
        super(service, params);
        this.paging = {
            itemTotal: 0,
            pageIndex: 1,
            pageSize: 10
        };
        this.service = service;
    }
    async fetchList(data) {
        const params = { ...this.params, ...this.paging, ...data };
        Object.keys(params).forEach(key => {
            if (!['itemTotal', 'pageIndex', 'pageSize'].includes(key)) {
                this.params[key] = params[key];
            }
        });
        this.loading = true;
        const res = await this.service.list(params)
            .finally(() => {
            this.loading = false;
        });
        const { itemTotal, pageIndex } = res;
        const { pageSize } = params;
        this.paging = { itemTotal, pageIndex, pageSize };
        this.list = res.data;
        return res;
    }
}
//# sourceMappingURL=paging.controller.js.map