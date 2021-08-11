import { IBaseEntity } from '@/core/abstract/base';
import { RowTable } from '@/core/typings/b-row-table';

export default class BTableConfigEditing<T>  {
    public routeTo: string;
    public icon: string;
    public outlined: boolean;
    public type: string;
    public isModal: boolean;
    public modal!: BTableConfigEditingModal<T>;
    constructor() {
        this.routeTo = 'edit';
        this.icon = 'pencil';
        this.type = 'is-warning';
        this.isModal = false;
        this.outlined = false;
        this.modal = new BTableConfigEditingModal<T>();
    }
    public edit?(id: number, row: T, props: RowTable<T>): void;
    public isEditableRow(row: T): boolean {
        return true;
    };
}

export class BTableConfigEditingModal<T> {
    public modelId:number;
    public model: T | IBaseEntity;
    public title: string;
    public active: boolean;
    public saving: boolean;
    public fullScreen: boolean;
    public canCancel: any;
    public closeOnSave: boolean;
    public width: number;
    public btnCloseText: string;
    public btnRestartText: string;
    public btnAddText: string;

    constructor() {
        this.model = {} as IBaseEntity;
        this.modelId = 0;
        this.title = 'Editar';
        this.active = false;
        this.saving = false;
        this.closeOnSave = true;
        this.fullScreen = false;
        this.canCancel = ['escape', 'x', 'outside'];
        this.width = 960;
        this.btnCloseText = 'Cerrar';
        this.btnAddText = 'Guardar';
        this.btnRestartText = 'Reiniciar';
    }
    public save?(): void;
    public close?(): void;
    public restart?(): void;
}