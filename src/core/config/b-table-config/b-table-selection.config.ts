export default class BTableConfigSelection<T> {
    public selected: T | any;
    constructor() {
        this.selected = null;
    }
    change!: (row: T , oldRow: T ) => void;
}