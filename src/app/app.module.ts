import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartialsModule } from './Partials/partials.module';
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
    PartialsModule,
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
