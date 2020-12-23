import { cloneDeep } from 'lodash';
// 通用list控制器(无翻页)
// T: list item类型
// P: list param类型
export default class ListController {
    constructor(service, params) {
        this.list = [];
        this.loading = false;
        this.selected = [];
        this.service = service;
        this.params = params;
        this.defaultParams = cloneDeep(params);
    }
    setParams(params) {
        this.params = { ...this.params, ...params };
    }
    resetParams() {
        this.params = cloneDeep(this.defaultParams);
    }
    async fetchList(params) {
        params = { ...this.params, ...params };
        this.params = params;
        this.loading = true;
        const res = await this.service.list(params)
            .finally(() => {
            this.loading = false;
        });
        this.list = this.resReader(res).list;
        return res;
    }
    // to be customised
    resReader(res) {
        return {
            list: res.data
        };
    }
    async fetchDetail(data) {
        return this.service.detail(data);
    }
    async create(data) {
        await this.service.create(data);
        this.fetchList();
    }
    async remove(data) {
        await this.service.remove(data);
        this.fetchList();
    }
    async update(data) {
        await this.service.update(data);
        this.fetchList();
    }
}
//# sourceMappingURL=list.controller.js.map