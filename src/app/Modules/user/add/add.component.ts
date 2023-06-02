import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsSettingsService } from 'src/app/services/as-settings.service';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  UserForm!: FormGroup;

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    public asSettinsService:AsSettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  initRegisterForm() {


   // this.getListSector();
    this.UserForm = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      email1: ["", Validators.compose([Validators.required,Validators.email])],
      phone1_type_uid: [""],
      phone1: [""],
      email1_type_uid: ["", Validators.compose([Validators.required])],
      company_name: ["",Validators.compose([ Validators.maxLength(50)])],
      position: ["",Validators.compose([ Validators.maxLength(50)])],
      file_data: [""],
      file_ext: [""],

    });


    if (this.data.user2) {

      this.UserForm.addControl("ma_user_uid", new FormControl());

      const controls = this.UserForm.controls;

 
      Object.keys(controls).forEach(controlName => {

        controls[controlName].setValue(this.data["user2_" + controlName])
      });
   


    }

  }

  submit(){
    
  }

}


