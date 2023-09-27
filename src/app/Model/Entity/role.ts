import { Dto ,IDto} from "../../core/models/dto.base";

export class Role extends  Dto {
    name: string="";
    description: string="";
    level: string="";

}

// export class Role extends Dto {
//     name: string | undefined;
//     description: string | undefined;
//     level: string | undefined;

// }