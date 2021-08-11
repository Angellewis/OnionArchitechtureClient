export default class BTableConfigDetailing {
    public showDetailIcon: boolean;
    public openedDefault: number[];
    public key: string;

    constructor() {
        this.key = 'id';
        this.showDetailIcon = true;
        this.openedDefault = [];
    }
    public visibility!: (row: object) => void;
    public open!: (row: object) => void;
    public close!: (row: object) => void;

}