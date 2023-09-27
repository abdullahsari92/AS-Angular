import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { TranslateService } from 'src/app/services/translate.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UserComponent } from '../user.component';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private translate: TranslateService,
    private userService:UserService,


    public dialogRef: MatDialogRef<UserComponent>,
  ) {

    
  }


  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {


   // this.getListSector();
    this.UserForm = this.fb.group({
      firstName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required,Validators.email])],
      username: [""],
      password: ["", Validators.compose([Validators.required])],   
    });


    if (this.data.id) {

      this.UserForm.addControl("id", new FormControl());

      const controls = this.UserForm.controls;

 
      Object.keys(controls).forEach(controlName => {

        controls[controlName].setValue(this.data[controlName])
      });
   


    }

  }


  save() {
    if (this.data.id) {

      this.update();
    }

    else {
      this.add();

    }


  }

  add() {
		const controls = this.UserForm.controls;

    if (this.UserForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}


    this.userService.add(this.UserForm.value).subscribe(res => {
      console.log('manual_contact_add',res)

      if (res.success) {

        this.dialogRef.close({
          data: res.data
        });
        Swal.fire({
          title: this.translate.getValue("TEXT.TRANSACTION_SUCCESSFUL"),
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        })
      }
      else {      
        // Swal.fire({
        //   icon: 'error',
        //   html:this.translate.getValue(res.error.code) + "<br>" + this.asSettingsService.hataObjectGoster(res.error),
        //   showConfirmButton: true,
        // })

      }

    })
  }

  hataObjectGoster(hataObje:any , mesaj:any):string
  {    
     let html = '';
     hataObje.forEach((m:any) => {       
      html += m + " : " + this.translate.getValue(mesaj[m]) + "<br>" 
     });
     return html;
  }

  mapKey(sourceData:any,setData:any)
  {

    Object.keys(setData).forEach(controlName =>{
      sourceData[controlName]=setData[controlName]
    });

    return sourceData;
  }


  update() {
 
    this.userService.update(this.UserForm.value).subscribe(res => {

      console.log('edituserProfile',res)

      if (res.success) {
        this.dialogRef.close({
          data: res.data
        });
        Swal.fire({
          title: this.translate.getValue("TXT_TRANSACTION_SUCCESSFUL"),
          icon: 'success',
          showConfirmButton: false,

          timer: 2500
        })


      }
      else {
        Swal.fire({
          //title: this.translateService.getValue("TEXT.TRANSACTION_SUCCESSFUL"),
          icon: 'error',
          html:res.message,
          showConfirmButton: true,
        
        })

      }
    })

  }

}


