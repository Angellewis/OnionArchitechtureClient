import { DocumentType, Gender, UserRole } from "@/core/utils/enums";
import { BaseEntity } from "./base.model";
import { WorkShopDay } from "./workshopday.model";
import { WorkShopMember } from "./workshopMember.model";

export class WorkShop extends BaseEntity {

    name: string = '';
    description: string = '';
    startDate: Date | null | string = null;
    endDate?: Date | null | string = null;
    contentSupport: string = '';
    days?: WorkShopDay[] = [];
    members?: WorkShopMember[] = [];
}
