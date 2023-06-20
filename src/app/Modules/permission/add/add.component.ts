import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from 'src/app/Model/Entity/permission';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PermissionService } from 'src/app/services/permission.service';
import { TranslateService } from 'src/app/services/translate.service';
import { PrivateLayoutComponent } from 'src/app/theme/layout/private-layout/private-layout.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  permission:Permission | undefined;
  lang: any
  permissionForm!: FormGroup;
  currentCode: string = "";
  isActiveButon = "";
  statusLanguages: any[] = [];
  imgUrl:any;
  constructor(private fb: FormBuilder,
    public asSettingsService: AsSettingsService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<PrivateLayoutComponent>,
    private translate: TranslateService,
    private permissionService:PermissionService, 
    @Inject(MAT_DIALOG_DATA) public data: any


  ) {
    this.lang = this.localStorageService.getItem("languagesDefitions");

  }


  ngOnInit(): void {
    this.initPermissionForm();
    this.statusLanguages = this.asSettingsService.statusLanguages;

  }




  initPermissionForm() {
  
    this.permissionForm = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      actionName: [""],
      controllerName: ["", Validators.compose([Validators.required])],
   

    });


    if (this.data.id) {

      console.log('gelenData', this.data)
      this.permissionForm.addControl("id", new FormControl());

      const controls = this.permissionForm.controls;

  
      Object.keys(controls).forEach(controlName => {

        controls[controlName].setValue(this.data[controlName])
      });


    }

  }


  ObjectContorls() {
    const controls = this.permissionForm.controls;

    var deger = Object.keys(controls).filter(m => m != "email_type_uid");
    return deger;
  }






  save() {
    if (this.data.id) {

      this.update();
    }

    else {
      this.Add();

    }



  }

  Add() {
		const controls = this.permissionForm.controls;

    if (this.permissionForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}


    this.permissionService.add(this.permissionForm.value).subscribe(res => {
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
        Swal.fire({
          icon: 'error',
          html:res.message,
          showConfirmButton: true,
        })

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
  
  profilePhotoForm:FormGroup = new FormGroup({ 
    file_data:new FormControl("",Validators.compose([Validators.required])),
    file_ext:new FormControl("",Validators.compose([Validators.required])),

  })


  update() {

  
    this.permissionService.update(this.permissionForm.value).subscribe(res => {

      console.log('edituserProfile',res)
      this.dialogRef.close({
        data: res.data
      });
      if (res.success) {

        Swal.fire({
          title: this.translate.getValue("TEXT.TRANSACTION_SUCCESSFUL"),
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        })


      }
      else {
        // Swal.fire({
        //   //title: this.translateService.getValue("TEXT.TRANSACTION_SUCCESSFUL"),
        //   icon: 'error',
        //   html:this.translate.getValue(res.error.code) + "<br>" + this.asSettingsService.hataObjectGoster(res.error),
        //   showConfirmButton: true,
        
        // })

      }
    })

  }


}
