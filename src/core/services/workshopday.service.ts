import { BaseService, IBaseService } from "./base.service";
import { WorkShopDay } from "../model";

export interface IWorkShopdayService extends IBaseService<WorkShopDay> {

}

export class WorkShopdayService extends BaseService<WorkShopDay> implements IWorkShopdayService {

    constructor(controller: string) {
        super(controller)
    }
}
