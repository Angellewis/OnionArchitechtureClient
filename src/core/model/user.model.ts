import { Gender, UserRole } from "@/core/utils/enums";
import { IBaseEntity } from "./base.model";

export default interface IUser extends IBaseEntity {
    fullName: string;
    name: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    gender: Gender;
    dob: string | null;
    documentType: DocumentType;
    documentTypeValue: string;
    photoId: number | null;
    photoFileName: string;
    userName: string;
    password: string;
    userRole: UserRole;
    signature:string;
}