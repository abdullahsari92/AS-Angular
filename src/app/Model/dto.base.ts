import { UserModel } from "./user.model";

export interface Dto {
    id: string;
    creationTime: string;
    createdBy: UserModel | null;
    updateTime: string;
    updatedBy: UserModel | null;
    isApproved: boolean;
}