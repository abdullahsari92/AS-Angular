export interface Permission {
    id:number
    name: string;
    description: string;
    controllerName: string;
    actionName: string;
    checked:boolean;
}