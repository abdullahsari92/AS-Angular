import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './Modules/user/user.component';
import { PartialsModule } from './Partials/partials.module';
import { RoleComponent } from './Modules/role/role.component';
import { AuthenticationInterceptor } from './authentication-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PartialsModule
  ],
  providers: [
	  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
