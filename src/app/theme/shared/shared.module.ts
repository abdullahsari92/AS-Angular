import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { GalleriaModule } from 'primeng/galleria';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { OrderListModule } from 'primeng/orderlist';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ClaimsAuth } from 'src/app/core/directives/claims.directive';

const primeNGModules = [

//PrimeNG
CalendarModule,
GalleriaModule,
ConfirmPopupModule,
ProgressBarModule,
ImageModule,
TableModule,
MultiSelectModule,
InputTextModule,
DropdownModule,
SkeletonModule,
OrderListModule,
ConfirmDialogModule,
DataViewModule,
TreeModule

//PrimeNG
];


@NgModule({
  declarations: [
    ClaimsAuth
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    primeNGModules
    
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,  
    primeNGModules,
    ClaimsAuth
		


  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
    // TitleCasePipe,
    // DatePipe,
  ]
})
export class SharedModule { }
