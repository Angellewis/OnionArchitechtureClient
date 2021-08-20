import { BaseService, IBaseService } from "./base.service";
import { WorkShopMember } from "../model";

export interface IWorkShopMemberService extends IBaseService<WorkShopMember> {

}

export class WorkShopMemberService extends BaseService<WorkShopMember> implements IWorkShopMemberService {

    constructor(controller: string) {
        super(controller)
    }
}
