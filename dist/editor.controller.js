import { cloneDeep, isEqual } from 'lodash';
// 通用编辑控制器
export default class EditorController {
    constructor() {
        this.data = null;
        this.snapshot = null;
    }
    get changed() {
        return !isEqual(this.data, this.snapshot);
    }
    setData(data) {
        this.data = cloneDeep(data);
        this.takeSnapshot();
    }
    takeSnapshot() {
        this.snapshot = cloneDeep(this.data);
    }
    exit() {
        this.data = null;
        this.snapshot = null;
    }
}
//# sourceMappingURL=editor.controller.js.map