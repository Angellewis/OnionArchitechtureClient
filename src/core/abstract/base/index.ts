export interface IBase {
    id: number | null;
    deleted: boolean;
}

export interface IBaseEntity extends IBase {
    deletedDate: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    createdBy: string;
    deletedBy: string;
    updatedBy: string;
}