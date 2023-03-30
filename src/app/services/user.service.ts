import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from './as-settings.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint="User/";

headers:any
  constructor(
   private asSettingsService: AsSettingsService,
    private http: HttpClient,
  ) { }

  getList(): Observable<any> {

      return this.http.get<any>(this.asSettingsService.apiUrl+this.endPoint + 'GetAll');

  }

  add(data:any): Observable<any> {

    return this.http.post<any>(this.asSettingsService.apiUrl+this.endPoint+'Add', data);
}

update(data:any): Observable<any> {


  return this.http.post<any>(this.asSettingsService.apiUrl+this.endPoint+'Update', data);

}



}
