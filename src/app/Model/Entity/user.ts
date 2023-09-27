import { Dto } from "../../core/models/dto.base";

export class User extends Dto {
    firstName!: string;
    lastName!: string;
    displayName!: string;
    username!: string;
    password!: string;
    email!: string;
}