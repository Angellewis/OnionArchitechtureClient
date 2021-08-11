import BTableColumn from '@/core/models/b-table-column.model';
import BTableConfigChecking from './b-table-checking.config';
import BTableConfigDetailing from './b-table-detailing.config';
import BTableConfigPagination from './b-table-pagination.config';
import BTableConfigSorting from './b-table-sorting.config';
import BTableConfigStyle from './b-table-style.config';
import BTableConfigSelection from './b-table-selection.config';
import BTableConfigAggregating from './b-table-aggregating.config';
import BTableConfigEditing from './b-table-editing.config';
import BTableConfigRemoving from './b-table-removing.config';
import { BaseService } from '@/core/services';

export default class BTableConfig<T> {
    public controller!: string;
    public resource!: string;
    public whereParams!: string;
    public include!: string;
    public data: T[];
    public columns: BTableColumn[];
    public loading: boolean;
    public enableDefaultColumns: boolean;//Enables Id, Fecha and Usuario columns
    public customRowKey: string;
    public loadOnMount: boolean;
    public showReload: boolean;
    public reloadText: string;
    public actions: ColumnActionConfig<T>;
    public customEmptyTemplate!: boolean;
    public customButtomLeftTemplate!: boolean;
    public emptyText: string;
     //  EDITION
    public editable: boolean;
    public editing: BTableConfigEditing<T>;

    //  REMOVING
    public removable: boolean;
    public removing: BTableConfigRemoving<T>;

    //  AGGREGATION
    public aggregatable: boolean;
    public aggregating: BTableConfigAggregating<T>;

    //  SELECTION
    public selectable: boolean;
    public selection: BTableConfigSelection<T>;
    public focusable: boolean;

    //  CHECKING
    public checkable: boolean;
    public checking: BTableConfigChecking<T>;

    // DETAILING
    public detailed: boolean;
    public detailing: BTableConfigDetailing;

    //  PAGINATION
    public paginated: boolean;
    public pagination: BTableConfigPagination;

    // SORTING
    public sorting: BTableConfigSorting;

    // STYLING
    public style: BTableConfigStyle;

    //HTTP
    private service = new BaseService<T>(this.controller);


    //Methods
    public rowClass?:(row: T, index: number)=>void;
    public click!: (row: T) => void;
    public dblclick!: (row: T) => void;
    public rightClick!: (row: T) => void;

   

    constructor() {
        this.columns = [];
        this.data = [];
        this.loading = false;
        this.customRowKey = 'id';
        this.loadOnMount = true;
        this.emptyText = "No hay datos."
        this.reloadText = "Reiniciar"
        this.enableDefaultColumns = true;
        this.showReload = true;
        this.actions = new ColumnActionConfig<T>();

        this.aggregatable = true;
        this.aggregating = new BTableConfigAggregating<T>();

        this.editable = true;
        this.editing = new BTableConfigEditing<T>();

        this.removable = true;
        this.removing = new BTableConfigRemoving<T>();

        this.selectable = false;
        this.focusable = false;
        this.selection = new BTableConfigSelection<T>();

        this.checkable = false;
        this.checking = new BTableConfigChecking<T>();

        this.detailed = false;
        this.detailing = new BTableConfigDetailing();

        this.paginated = true;
        this.pagination = new BTableConfigPagination();

        this.sorting = new BTableConfigSorting();

        this.style = new BTableConfigStyle();

    }
    get apiService() {
        return this.service.controller ? this.service : new BaseService<T>(this.controller);
    }
    public setRows(rows: T[], callback?: (payload:T[])=>void) {
        this.data = rows;
        if (callback) callback(this.data);
    }
    public addRows(rows: T[], callback?: (payload:T[])=>void) {
        rows.forEach(x => this.data.push(x));
        if (callback) callback(this.data);
    }
    public insertRows(...rows: T[]) {
        rows.forEach(x => this.data.push(x));
    }
    public addRow(row: T, callback?: (payload:T[])=>void) {
        this.data.push(row);
        if (callback) callback(this.data);
    }
    public setColumns(columns: BTableColumn[], callback?: (payload:BTableColumn[])=>void) {
        this.columns = columns;
        if (callback) callback(this.columns);
    }
    public addColums(columns: BTableColumn[], callback?: (payload:BTableColumn[])=>void) {
        columns.forEach(x => this.columns.push(x));
        if (callback) callback(this.columns);
    }
    public insertColumns(...columns: BTableColumn[]) {
        columns.forEach(x => this.columns.push(x));
    }
    public addColum(columns: BTableColumn, callback?: (payload:BTableColumn[])=>void) {
        this.columns.push(columns);
        if (callback) callback(this.columns);
    }
    public reload!: (callback?: (payload:T[])=>void) => void;
    public onLoad?:(data:T[])=> void;

}

class ColumnActionConfig<T> {
    public active: boolean;
    public customTemplate: boolean;
    public props: BTableColumn;
    
    constructor() {
        this.active = true;
        this.customTemplate = false;
        this.props = new BTableColumn('btn-action', 'Acciones');
        this.props.sortable = false;
        this.props.centered = true;
    }
}


