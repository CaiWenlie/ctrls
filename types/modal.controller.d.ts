export default class ModalController<T = any, P = T> {
    visible: boolean;
    data: T | null;
    callback?: ((res?: P) => any) | null;
    open(data?: T, callback?: (res?: P) => any): void;
    close(): void;
}
