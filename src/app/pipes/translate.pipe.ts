import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(

    private translate:TranslateService,
    private localStorageService:LocalStorageService
  ){

  }  
  transform(key: any): any {

    
   var code =   this.localStorageService.getItem("langType");
    
    this.translate.use(code);

    if(this.translate.data[key])    
       return this.translate.data[key];
    else
        return key;
  }
}
