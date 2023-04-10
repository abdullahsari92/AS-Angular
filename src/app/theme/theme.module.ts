import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './material/material.module';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';
import { CoreModule } from '../core/core.module';
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
  declarations: [MenuComponent, PrivateLayoutComponent, PublicLayoutComponent,MenuHorizontalComponent, LeftMenuComponent],
  imports: [
    CommonModule,   
   MaterialModule,
   RouterModule,HttpClientModule,
   CoreModule
  ],
  exports: [
    MenuComponent,
    MaterialModule,
    MenuHorizontalComponent

  ],
  providers: [
     DatePipe
  ]

})
export class ThemeModule { }
