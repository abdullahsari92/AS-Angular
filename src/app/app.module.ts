import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './Modules/user/user.component';
import { PartialModule } from './Partials/partial.module';
import { RoleComponent } from './Modules/role/role.component';
import { AuthenticationInterceptor } from './authentication-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './theme/material/material.module';
import { ThemeModule } from './theme/theme.module';
import { CoreModule } from './core/core.module';
import { MenuHorizontalService } from './core/services/menu-horizontal.service';

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
