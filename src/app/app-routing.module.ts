import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './Modules/role/role.component';
import { UserComponent } from './Modules/user/user.component';
import { PrivateLayoutComponent } from './theme/layout/private-layout/private-layout.component';

const routes: Routes = [

  {  path:'admin', 
   component:PrivateLayoutComponent ,children:[

    {  path:'',   component:UserComponent},

    {  path:'user',   component:UserComponent},
  
    {  path:'role/:contentTipi',   component:RoleComponent },
  
    {  path:'role',   component:RoleComponent },
  	{
      path: 'permission',
      loadChildren: () => import('./Modules/permission/permission.module').then(m => m.PermissionModule)
    },


  ]},
  
  {  path:'', 
  component:PrivateLayoutComponent ,children:[

   {  path:'',   component:UserComponent},
 ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
