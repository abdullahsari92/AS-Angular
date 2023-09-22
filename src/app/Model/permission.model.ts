import { Permission } from "./Entity/permission";

export class PermissionModel {
    controllerName:string ="";
    checked:boolean=false;
    indeterminate:boolean = false;
    controllerCrudList:ControllerCRUD[] = [];
}


export interface ControllerCRUD {


    checked:boolean;
    crudActionType:number;

}

