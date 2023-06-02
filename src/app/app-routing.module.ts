import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './Modules/role/role.component';
import { PrivateLayoutComponent } from './theme/layout/private-layout/private-layout.component';

const routes: Routes = [

  {  path:'admin', 
   component:PrivateLayoutComponent ,children:[   
  
    {  path:'role/:contentTipi',   component:RoleComponent },
  
    {  path:'role',   component:RoleComponent },
<<<<<<< HEAD
  
     {path:"user",loadChildren: () =>import('./Modules/user/user.module').then(m=>m.UserModule)},
    
=======
  	{
      path: 'permission',
      loadChildren: () => import('./Modules/permission/permission.module').then(m => m.PermissionModule)
    },

>>>>>>> ed132cdea3920dd55396e5d0116641b1987c211c

  ]},
  
  {  path:'', 
  component:PrivateLayoutComponent ,children:[

    {path:"",loadChildren: () =>import('./Modules/user/user.module').then(m=>m.UserModule)},

 ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
