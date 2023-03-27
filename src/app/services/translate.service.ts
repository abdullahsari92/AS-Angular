import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService implements OnInit {

  data: any = {};
  translation:any;
  langType:string="";
  constructor(
    private http: HttpClient,
    private localStorageService:LocalStorageService,

  ) {

      this.langType = this.localStorageService.getItem("langType");
    
        
   }
  ngOnInit(): void {

    throw new Error('Method not implemented.');
  }

  
  //this.translation:any[]=[];
  use(lang: string='tr'): Promise<{}> {

    if(this.localStorageService.getItem("langType"))
    {
      this.localStorageService.setItem("langType",lang);
    }
    lang= this.localStorageService.getItem("langType");


    return new Promise<{}>((resolve, reject) => {
           
        this.translation =  this.localStorageService.getItem("languagesDefitions");
      
     // console.log('translation',this.translation)
      Object.keys(this.translation).forEach((key:any) => {
            this.translation[key] = this.translation[key][lang];
          });

          this.data = Object.assign({}, this.translation || {});

          resolve(this.data);
        
   }); 
  }

  getValue(key:string)
  {
    this.langType = this.localStorageService.getItem("langType");

    this.translation =  this.localStorageService.getItem("languagesDefitions");
  

    if(this.langType )
    {
      if(this.translation[key])
      {
        return  this.translation[key][this.langType];

      }
      else
      {
         return key;
      }

    }
     
  

  }

}
