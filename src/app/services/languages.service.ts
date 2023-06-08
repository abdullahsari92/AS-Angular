import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from './as-settings.service';
import { BaseCrudService } from '../core/services/base-crud.service';
import { apiResult } from '../core/models/apiResult';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService  extends BaseCrudService {


  endPoint="Language/";
  headers:any
    constructor(
      protected override asSettingsService: AsSettingsService,
      protected override httpClient: HttpClient,
   
    ) { 
      super( asSettingsService,httpClient,'Language/')
  
    }


    getConfigAll(): Observable<any>
    {

      const langPath = `assets/i18n/lang.config.json`;
     return this.httpClient.get<{}>(langPath);
    }

    addAll(body:any):Observable<any> {

            return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "AddAll", body);
  
 
    }
}
