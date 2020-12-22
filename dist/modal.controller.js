// 通用弹窗控制器
export default class ModalController {
    constructor() {
        this.visible = false;
        this.data = null;
    }
    open(data, callback) {
        if (data) {
            this.data = data;
        }
        if (callback) {
            this.callback = callback;
        }
        this.visible = true;
    }
    close() {
        this.visible = false;
        this.data = null;
        this.callback = null;
    }
}
//# sourceMappingURL=modal.controller.js.map