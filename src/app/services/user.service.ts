import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsSettingsService } from './as-settings.service';
import { BaseCrudService } from '../core/services/base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseCrudService {

headers:any
  constructor(
    protected override asSettingsService: AsSettingsService,
    protected override httpClient: HttpClient,
 
  ) { 
    super( asSettingsService,httpClient,'User/')

  }


}
