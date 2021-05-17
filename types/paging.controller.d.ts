import ListController, { TListService } from './list.controller';
declare type TPagingService<T, P> = Omit<TListService<T, P>, 'list'> & {
    list: (params: P & Partial<Pagination>) => Promise<any>;
};
export default class PagingController<T = any, P = any> extends ListController<T, P> {
    service: TPagingService<T, P>;
    _pagination: Pagination;
    constructor(service: TPagingService<T, P>, params: P);
    get pagination(): {
        itemTotal: number;
        pageIndex: number;
        pageSize: number;
    };
    paginationGetter(pagination: Pagination): {
        itemTotal: number;
        pageIndex: number;
        pageSize: number;
    };
    resReader(res: any): {
        list: any;
        itemTotal: any;
        pageIndex: any;
        pageSize: any;
    };
    fetchList(data?: Partial<Pagination> & Partial<P>): Promise<any>;
}
export interface Pagination {
    pageSize: number;
    pageIndex: number;
    itemTotal: number;
}
export {};
