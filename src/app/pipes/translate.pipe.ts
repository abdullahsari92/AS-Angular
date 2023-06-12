import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { TranslateService } from '../services/translate.service';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  
  private languagesSubject = new BehaviorSubject<any>([]);

  translation:any[]=[];
  constructor(

    private translate:TranslateService,
    private localStorageService:LocalStorageService
  ){

  }  
  transform2(key: any): any {

    
   var code =   this.localStorageService.getItem("language");
    
    this.translate.use(code);

    if(this.translate.data[key])    
       return this.translate.data[key];
    else
        return key;
  }


  transform(key: any): any {

    
    var lang =   this.localStorageService.getItem("language");
     
    this.translation =  this.localStorageService.getItem("languagesDefitions");

    if(lang)
    {
     var findLang = this.translation.find(p =>p.keyword.toUpperCase() == key.toUpperCase())
      if(findLang)
      { 
        return  findLang[lang];
  
      }
      else
      {
         return key.split(".")[1];
      }
  
    }
   }

   transformEski(key: any): any {

    
    var lang =   this.localStorageService.getItem("language");
     
    this.translation =  this.localStorageService.getItem("languagesDefitions");

    if(lang)
    {
      if(this.translation[key])
      {
        return  this.translation[key][lang];
  
      }
      else
      {
         return key;
      }
  
    }
   }
 

 
}
