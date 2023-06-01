
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { apiResult } from '../models/apiResult';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudService {

  constructor(
    protected asSettingsService: AsSettingsService,
    protected httpClient: HttpClient,
    @Inject(String) private endPoint: any
  ) { }

  getList(data:any=null): Observable<apiResult> {

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "getList", data);
  }

  save(body: any): Observable<apiResult> {

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "save", body);
  }

  getByUid(uid: string): Observable<apiResult> {

    var body = { uid: uid }

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "get_by_uid", body);
  }

  getByUidBody(body: any): Observable<apiResult> {

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "get_by_uid", body);
  }
  delete(uid: string): Observable<apiResult> {

    var body = { uid: uid }

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "delete", body);
  }

  add(data: any): Observable<apiResult> {

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "add", data);
  }
  
  update(data: any): Observable<apiResult> {
  
    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "update", data);
  }
  logo_upload(data: any): Observable<apiResult> {
  
    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endPoint + "logo_upload", data);
  }
  
  

  filter(model: any): Observable<HttpResponse<apiResult>> {
    return this.httpClient.post<apiResult>(
      this.asSettingsService.apiUrl + this.endPoint + 'Filter',
      model,
      { observe: 'response' });
  }







}
