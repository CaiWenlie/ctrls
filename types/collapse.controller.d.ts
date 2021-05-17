import ModalController from './modal.controller';
export default class CollapseController<T = any> extends ModalController<T> {
    constructor(data: T);
    close(): void;
}
