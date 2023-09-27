
export class Dto implements IDto {
    id: string ="";
    createdByFullName: string ="";
    creationTime: string="";
    updateTime: string ="";
    updatedByFullName!: string;
    isApproved: boolean = false;
    // id: string;
    // creationTime: string;
    // createdBy: User | null;
    // updateTime: string;
    // updatedBy: User | null;
    // isApproved: boolean;
}

export interface IDto {
    id: string;
    creationTime: string;
    createdByFullName: string;
    updateTime: string;
    updatedByFullName: string;
    isApproved: boolean;
}