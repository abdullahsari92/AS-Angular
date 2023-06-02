import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AddComponent } from './add/add.component';
import { MaterialModule } from 'src/app/theme/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';

const routes: Routes = [

    {  path:'',   component:UserComponent},

    {  path:'user',   component:UserComponent},
    {  path:'add',   component:AddComponent},


];

@NgModule({
  declarations: [UserComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ThemeModule

  ]
})
export class UserModule { }
