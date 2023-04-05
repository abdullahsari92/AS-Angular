import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [MenuComponent, PrivateLayoutComponent, PublicLayoutComponent],
  imports: [
    CommonModule,   
   MaterialModule,
   RouterModule,HttpClientModule,
  ],
  exports: [
    MenuComponent,
    MaterialModule,

  ],
  providers: [
     DatePipe
  ]

})
export class ThemeModule { }
