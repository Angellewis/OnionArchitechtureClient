import { BaseEntity } from "./base.model";
import { WorkShopMemberRole } from "@/core/utils/enums";
import { User } from "./user.model";
import { WorkShop } from "./workshop.model"

export class WorkShopMember extends BaseEntity {

    role: WorkShopMemberRole = WorkShopMemberRole.STUDENT;
    workShopId!: number;
    userId!: number;
    workShop!: WorkShop;
    user!: User;
}

