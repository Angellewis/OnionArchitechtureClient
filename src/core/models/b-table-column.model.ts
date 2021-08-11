import { BTableColumnType } from '@/core/utils/enums';

export default class BTableColumn {
    public width?: string;
    public visible?: boolean;
    public numeric?: boolean;
    public centered?: boolean;
    public customKey?: string;
    public customSort?: ()=>void;
    public meta?: string;
    public customTemplate?: boolean;
    public templateSlot?: string;
    public order?: number;
    public type?: BTableColumnType;
    constructor(
        public field: string,
        public label?: string, public sortable: boolean = true) { 
        this.label = this.label || this.field;     
        this.visible = true;
    }
    public customFilter!: (value:string)=> void;
}
