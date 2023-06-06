import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from 'src/app/theme/theme.module';
import {  PartialsModule } from 'src/app/Partials/partials.module';
import { PermissionComponent } from './permission.component';
import { AddComponent } from './add/add.component';



const routes: Routes = [
	
  {path:"",component:PermissionComponent},
  {path:"List",component:PermissionComponent},
  {path:"Add",component:AddComponent}


];


@NgModule({
  declarations: [PermissionComponent, AddComponent],
  imports: [
   RouterModule.forChild(routes),
    CommonModule,
    ThemeModule,    
    PartialsModule,
    
  ]
})
export class PermissionModule { }
