import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';
import { keyValue } from '../Model/keyValue';

@Injectable({
  providedIn: 'root'
})
export class AsSettingsService {

  private previousUrl: string = "";
  private currentUrl: string = "";

  appPrivateKey = 'ac987c878f5655c06dcd2fc9b02f576b8e026562';
  tokenKey = 'customidentitytoken';
  apiUrl = environment.apiUrl;

  sessionKey='customidentitySession';
siteUrl ="https://fairscope.cevizyazilim.com/#/"
  calendarTr = {
    firstDayOfWeek: 1,
    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarsamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    dayNamesShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cte'],
    dayNamesMin: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
    monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    today: 'Bugün',
    dateFormat: 'dd/mm/yy',
    clear: 'Temizle'
  };

  selectedStatus = { key: -1, value: '[Tümü]' };
  selectedPageSize = { key: 10, value: '10' };

  fileBaseUrl="https://apifairscope.cevizyazilim.com/v100/fpublic/get_file_thumb/";
  fileBaseUrlOrjinal="https://apifairscope.cevizyazilim.com/v100/fpublic/get_file/";

  statusOptions = [
    { key: -1, value: '[Tümü]' },
    { key: 1, value: 'Onaylı' },
    { key: 0, value: 'Onaysız' },
  ];

  statusLanguages = [
    { key: "Tr", value: 'tr' },
    { key:  "En", value: 'en' },
    { key:"Fr", value: 'fr' },
    { key:"De", value: 'de' },

  ];


  rowsPerPageOptions = [
    5,
    10,
    25,
    50,
    100,
    500,
    { showAll: '[Tümü]' }
  ];

  pageSizes = [
  //  { key: -1, value: 'Tümü' },
    { key: 5, value: '5' },
    { key: 10, value: '10' },
    { key: 25, value: '25' },
    { key: 50, value: '50' },
    { key: 100, value: '100' },
    { key: 500, value: '500' },
  ];

  constructor(
    private router: Router
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }

  
  isControlHasError(controlName: string, validationType: string,form:FormGroup): boolean {
		const control = form.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

  


  public getSelectBoxByEnumType(enumType:any): keyValue[] {

    var keyValueList:keyValue[]=[];
    var objectDeger =    Object.keys(enumType);
    objectDeger.slice(objectDeger.length / 2).forEach(p=>{  
      var keyValue:keyValue = {value:enumType[p],key:p,selected:false};
      keyValueList.push(keyValue);        
      })

    return keyValueList;  
  }


  //enum key bigisini almak için, yani string olan tarafı almak için
  public getEnumKeyName(enumType:any,value:any)
  {

    const indexOfS = Object.values(enumType).indexOf(value as unknown);
		const key = Object.keys(enumType)[indexOfS];

    return key;
  }

  TocamelCase(str: string)
  {

    var i:number; 
    

          var key = str.split('.')[1] ?? str;
    var kelimeler = key.split('_');  
    str = '';
    var bosluk = kelimeler.length;

    for(i = 0 ;i<bosluk;i++) {

      kelimeler[i] =kelimeler[i].substr(0,1).toLocaleUpperCase() + kelimeler[i].substr(1).toLocaleLowerCase();
      
        if(i==0) str += 'TEXT.'+ kelimeler[i];
         if(i>0)  str +=  '_' + kelimeler[i];

    }

      return str;
    

  }


}
