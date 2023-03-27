import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from './as-settings.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  endPoint="admin/language_definitions/";

headers:any
  constructor(
   private asSettingsService: AsSettingsService,
    private http: HttpClient,
  ) { }

  getList(body:any): Observable<any> {

      return this.http.post<any>(this.asSettingsService.apiUrl+this.endPoint+'get_list', body);

  }

  add(data:any): Observable<any> {


    return this.http.post<any>(this.asSettingsService.apiUrl+this.endPoint+'add', data);

}

update(data:any): Observable<any> {


  return this.http.post<any>(this.asSettingsService.apiUrl+this.endPoint+'update', data);

}



}
