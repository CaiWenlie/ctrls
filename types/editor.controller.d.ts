export default class EditorController<T = number> {
    data: T | null;
    snapshot: T | null;
    get changed(): boolean;
    setData(data: T): void;
    takeSnapshot(): void;
    exit(): void;
}
