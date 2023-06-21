import { Permission } from "./Entity/permission";

export interface PermissionModel {
    key:string;
    checked:boolean;
    value:Permission[];
}