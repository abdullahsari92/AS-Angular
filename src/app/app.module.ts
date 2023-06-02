import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { PartialsModule } from './Partials/partials.module';
=======
import { UserComponent } from './Modules/user/user.component';
import { PartialModule } from './Partials/partial.module';
>>>>>>> ed132cdea3920dd55396e5d0116641b1987c211c
import { RoleComponent } from './Modules/role/role.component';
import { AuthenticationInterceptor } from './authentication-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme/theme.module';
import { CoreModule } from './core/core.module';
import { MenuHorizontalService } from './core/services/menu-horizontal.service';

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PartialModule,
    BrowserAnimationsModule,
    ThemeModule,
    CoreModule
  ],
  providers: [
	  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
		MenuHorizontalService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
