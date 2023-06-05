import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language.component';
import { AddComponent } from './add/add.component';
import { RouterModule, Routes } from '@angular/router';
import { PartialModule } from 'src/app/Partials/partial.module';


const routes: Routes = [
	
  {path:"",component:LanguageComponent},
  {path:"List",component:LanguageComponent},
  {path:"Add",component:AddComponent}


];


@NgModule({
  declarations: [LanguageComponent, AddComponent],
  imports: [
   RouterModule.forChild(routes),
    CommonModule,  
    PartialModule,
    
  ]
})
export class LanguageModule { }
