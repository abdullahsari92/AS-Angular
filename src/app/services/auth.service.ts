import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from './as-settings.service';
import { apiResult } from '../core/models/apiResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
headers:any
  constructor(
   private asSettingsService: AsSettingsService,
    private http: HttpClient,
  ) { }

  login(loginmodel:any): Observable<apiResult> {


    

    var regTime = new Date().getTime() / 1000;
    //var key= sha512(loginmodel.email+loginmodel.password+this.asSettingsService.appPrivateKey);

    var httpOpt = {
      headers:new HttpHeaders({
        "Key":"key",
        "Req-Time":regTime.toString(),       
      
      })
    }
      //loginmodel.key = sha512(loginmodel.eposta+loginmodel.sifre+"jy7qvxqt2qxtc8d7rmx39xacm6hzhm69c5danpvt");

      return this.http.post<apiResult>(this.asSettingsService.apiUrl+'user/login', loginmodel,httpOpt);

    
  }

  resetPassword(resetModel:any): Observable<apiResult> {

    

    var regTime = new Date().getTime() / 1000;
    //var key= sha512(resetModel.email+resetModel.password+this.asSettingsService.appPrivateKey);

    var httpOpt = {
      headers:new HttpHeaders({
        "Key":"key",
        "Req-Time":regTime.toString(),       
      
      })
    }
      //loginmodel.key = sha512(loginmodel.eposta+loginmodel.sifre+"jy7qvxqt2qxtc8d7rmx39xacm6hzhm69c5danpvt");

      return this.http.post<apiResult>(this.asSettingsService.apiUrl+'user/reset_password', resetModel,httpOpt);

    
  }


  
  register(data: any): Observable<apiResult> {

    var regTime = new Date().getTime() / 1000;


    var httpOpt = {
      headers:new HttpHeaders({
      //  "Key":key,

        "Req-Time":regTime.toString(),

        "Content-Type":"application/json"
      })
    }

   return this.http.post<apiResult>(this.asSettingsService.apiUrl+"user/register", data,httpOpt);

}

  
activate(data: any): Observable<apiResult> {

  var regTime = new Date().getTime() / 1000;
  //var key = sha512(data.c1+data.c2+this.asSettingsService.appPrivateKey);
  var httpOpt = {
    headers:new HttpHeaders({
    //  "Key":key,
      "Req-Time":regTime.toString(),
    })
  }
 return this.http.post<apiResult>(this.asSettingsService.apiUrl+"user/activate", data,httpOpt);

}

forget_password(resetModel:any): Observable<apiResult> {

    
  var regTime = new Date().getTime() / 1000;
 // var key= sha512(resetModel.email+this.asSettingsService.appPrivateKey);

  var httpOpt = {
    headers:new HttpHeaders({
   //   "Key":key,
      "Req-Time":regTime.toString(),       
    
    })
  }
    //loginmodel.key = sha512(loginmodel.eposta+loginmodel.sifre+"jy7qvxqt2qxtc8d7rmx39xacm6hzhm69c5danpvt");

    return this.http.post<apiResult>(this.asSettingsService.apiUrl+'user/forget_password', resetModel,httpOpt);

  }



}
