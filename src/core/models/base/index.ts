import { IBase, IBaseEntity } from "@/core/abstract/base";

export class Base implements IBase {
    id: number | null = 0;
    deleted: boolean = false;
}

export class BaseEntity extends Base implements IBaseEntity {
    deletedDate: string | null = null;
    createdDate: string | null = null;
    updatedDate: string | null = null;
    createdBy: string = '';
    deletedBy: string = '';
    updatedBy: string = '';
}