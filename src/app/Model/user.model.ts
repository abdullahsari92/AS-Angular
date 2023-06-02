import { Dto } from "./dto.base";

export interface UserModel extends Dto {
    firstName: string;
    lastName: string;
    displayName: string;
    username: string;
    password: string;
    email: string;
}