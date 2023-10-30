import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { IdentityService } from './services/identity.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


	headers: HttpHeaders | undefined;
token:string="";
	updatedRequest:any;
	constructor(
		private router: Router,
		private identityService: IdentityService,

	) {}


	

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (this.identityService.isLogged()) {
			this.token = this.identityService.get();			
		} else {
			this.token = '';
		}


			this.headers = new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': "Bearer " + this.token,
				'key':"AFADAFS343FSFsfsfsfwefsfsffsfs"		

			});

			this.updatedRequest = request.clone({ headers: this.headers});
	
		
		// var deger =  urlName.find(p=> p =='student');

		return next.handle(this.updatedRequest).pipe(
			tap(
				event => {

					// var urlName = this.updatedRequest.url.split('/');
					// var isStudent = this.updatedRequest.url.split('/')[3] === 'student';
				
					if (event instanceof HttpResponse) {
						if (event.status === 401) {
							this.router.navigate(['/User/MyProfile']);
							// console.log('event 401 :', event);
						} else {
							// console.log('api call success :', event);
						}
					}
				},
				error => {
					if (error.status === 401) {
						// var isStudent = this.updatedRequest.url.split('/')[3] === 'student';

						// if(isStudent)
						// {
						// 	this.router.navigate(['/login']);
						// 	return;
						// }
					    // else{					
						  this.router.navigate(['/auth/login']);
				    // 	}
						//geçici kapatıldı A.
						//this.router.navigate(['/auth/login']);
						// this.messageService.add(
						// { severity: 'error', summary: 'Yetkisiz Giriş!', detail: 'Bu işlem için yetkiniz yok!' });
					} else {
						console.log('api call error :', error);
						// this.router.navigate(['/Error/Server']);
						//  this.router.navigate(['/User/MyProfile']);
					}
				}
			)
		);
	}
}
