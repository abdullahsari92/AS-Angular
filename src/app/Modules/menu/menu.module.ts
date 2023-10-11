import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { AddComponent } from './add/add.component';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from 'src/app/Partials/partials.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


const routes: Routes = [
	
  {path:"",component:MenuComponent},
  {path:"List",component:MenuComponent},
  {path:"detail/:id",component:AddComponent}


];


@NgModule({
  declarations: [MenuComponent, AddComponent],
  imports: [
   RouterModule.forChild(routes),
    CommonModule,  
    PartialsModule,
    SharedModule
    
  ]
})
export class MenuModule { }
