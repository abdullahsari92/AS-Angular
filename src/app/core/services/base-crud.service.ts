
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
    @Inject(String) private endpoint: any
  ) { }

  getList(data:any=null): Observable<apiResult> {

    return this.httpClient.get<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "list");
  }

  save(body: any): Observable<apiResult> {

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "save", body);
  }

  getById(id: string): Observable<apiResult> {
  
    return this.httpClient.get<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "getById/" + id);
  }

  delete(id: string):Observable<apiResult>{

    return this.httpClient.delete<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "delete/"+ id);
  }

  add(data: any): Observable<apiResult> {

    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "add", data);
  }
  
  update(data: any): Observable<apiResult> {
  
    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "update", data);
  }
  logo_upload(data: any): Observable<apiResult> {
  
    return this.httpClient.post<apiResult>(this.asSettingsService.apiUrl + this.endpoint + "logo_upload", data);
  }
  
  

  filter(model: any): Observable<HttpResponse<apiResult>> {
    return this.httpClient.post<apiResult>(
      this.asSettingsService.apiUrl + this.endpoint + 'Filter',
      model,
      { observe: 'response' });
  }







}
