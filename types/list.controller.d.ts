export default class ListController<T = any, P = any> {
    service: TListService<T, P>;
    params: P;
    defaultParams: P;
    list: T[];
    loading: boolean;
    selected: T[];
    constructor(service: TListService<T, P>, params: P);
    setParams(params: Partial<P>): void;
    resetParams(): void;
    fetchList(params?: Partial<P>): Promise<any>;
    resReader(res: any): {
        list: any;
    };
    fetchDetail(data: Partial<T>): Promise<any>;
    create(data: Partial<T>): Promise<void>;
    remove(data: Partial<T>): Promise<void>;
    update(data: Partial<T>): Promise<void>;
}
export interface TListService<T, P> {
    list(params: P & any): Promise<any>;
    create?(data: Partial<T> & any): Promise<any>;
    remove?(data: Partial<T> & any): Promise<any>;
    update?(data: Partial<T> & any): Promise<any>;
    detail?(data: Partial<T> & any): Promise<any>;
}
