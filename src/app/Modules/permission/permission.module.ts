import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from 'src/app/theme/theme.module';
import { PartialModule } from 'src/app/Partials/partial.module';
import { PermissionComponent } from './permission.component';



const routes: Routes = [
	
  {path:"",component:PermissionComponent},
  {path:"List",component:PermissionComponent}

];


@NgModule({
  declarations: [PermissionComponent],
  imports: [
   RouterModule.forChild(routes),
    CommonModule,
    ThemeModule,    
    PartialModule,
    
  ]
})
export class PermissionModule { }
