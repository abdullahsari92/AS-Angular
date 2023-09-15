import { Injectable } from '@angular/core';
//import { loginModel } from '../models/loginModel';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {

  }

  //loginModel: loginModel;
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify({ objectName: value }));
  }


  getItem(key: any): any {

    var value = localStorage.getItem(key) as any;
    if(value)
    {
      try {
        var items = JSON.parse(value);

      return  items == null ? null : items.objectName;

      } catch (err: any) {
        // ⛔️ Uncaught SyntaxError: JSON.parse: unexpected character at
        // line 1 column 2 of the JSON data
        console.log(err.message);
      }
    
    }


  }


  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getObjectItems(fullPath:string):any
  {
    let path = fullPath.split(".")[0];
    let arrayName = fullPath.split(".")[1];

    var anaDizi:any[] = this.getItem(path);

    if(anaDizi)       
      return anaDizi[parseInt(arrayName)];
   
    
  }

}
