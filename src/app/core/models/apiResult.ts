export class  apiResult{

   
   data: any;
   success: boolean | undefined;
   message: boolean | undefined;

   //error: errorResult = new errorResult();

}

export class  errorResult{

   
   code: string="";
   message: any;

}

