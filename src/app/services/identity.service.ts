import { Injectable } from '@angular/core';
import { AsSettingsService } from './as-settings.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {


  constructor(
    private asSettingsService: AsSettingsService,

  ) { }

  set(token:string): void {
    this.logOut();
    sessionStorage.setItem(this.asSettingsService.tokenKey, token);


    // localStorage.setItem(this.appSettings.tokenKey, value);
  }

  get():any{

    return sessionStorage.getItem(this.asSettingsService.tokenKey);
    
    // return localStorage.getItem(this.appSettings.tokenKey);
  }

  logOut(): void {
    sessionStorage.removeItem(this.asSettingsService.tokenKey);
  


  }

  isLogged(): boolean {
    if (this.get() != null) {
      if (this.get().length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
      
    }
  }
}
