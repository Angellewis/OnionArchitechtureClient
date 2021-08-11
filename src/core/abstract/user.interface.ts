import { Gender, UserRole } from "@/core/utils/enums";
import { IBaseEntity } from "./base";

export interface IUser extends IBaseEntity {
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
}