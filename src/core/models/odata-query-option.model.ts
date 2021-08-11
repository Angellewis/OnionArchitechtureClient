export class ODataQueryBaseOption {
    public $filter: string | undefined = undefined;
    public $orderby: string | undefined = "id desc";
    public $top: number = Number.parseFloat(process.env.VUE_APP_PAGE_SIZE as any) || 10;
    public $skip: number | undefined = undefined;
    public $search: string | undefined = undefined;
} 

export class ODataQueryOption extends ODataQueryBaseOption {
    public $expand: string | undefined = undefined;
    public $select: string | undefined = undefined;
    public $count: boolean = true;
    constructor() {
        super()
    }
} 


