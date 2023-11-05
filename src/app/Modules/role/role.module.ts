import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { AddComponent } from './add/add.component';
import { RouterModule, Routes } from '@angular/router';
import { PartialsModule } from 'src/app/Partials/partials.module';
import { ThemeModule } from 'src/app/theme/theme.module';



const routes: Routes = [
	
  {path:"",component:RoleComponent},
  {path:"list",component:RoleComponent},
  {path:"detail/:id",component:AddComponent},
  {path:"detail",component:AddComponent}




];



@NgModule({
  declarations: [RoleComponent,
    AddComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ThemeModule,    
    PartialsModule,
  ]
})
export class RoleModule { }
