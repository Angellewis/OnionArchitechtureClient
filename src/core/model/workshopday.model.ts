import { WeekDay, WorkShopDayMode } from "@/core/utils/enums";
import { BaseEntity } from "./base.model";
import { WorkShop } from "./workshop.model";

export class WorkShopDay extends BaseEntity {

    day: WeekDay = WeekDay.MONDAY;
    mode: WorkShopDayMode = WorkShopDayMode.ON_SITE;
    modeLocation: string = '';
    startHour: Date | string | null = null;
    endHour?: Date | string | null = null;
    workShopId!: number;
    workShop!: WorkShop;
}
