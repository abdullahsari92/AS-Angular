import { Dto } from "src/app/core/models/dto.base";

export interface Permission extends Dto {
    name: string;
    description: string;
    controllerName: string;
    actionName: string;
    checked:boolean;
}