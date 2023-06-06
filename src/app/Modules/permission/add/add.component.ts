import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from 'src/app/Model/permission';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PermissionService } from 'src/app/services/permission.service';
import { TranslateService } from 'src/app/services/translate.service';
import { PrivateLayoutComponent } from 'src/app/theme/layout/private-layout/private-layout.component';

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
      description: ["", Validators.compose([Validators.required,Validators.email])],
      ActionName: [""],
      ControllerName: ["", Validators.compose([Validators.required])],
   

    });


    if (this.data.id) {

      console.log('gelenData', this.data)
      this.permissionForm.addControl("ma_user_uid", new FormControl());

      const controls = this.permissionForm.controls;

  
      Object.keys(controls).forEach(controlName => {

        controls[controlName].setValue(this.data[controlName])
      });


    }

  }


  ObjectContorls() {
    const controls = this.permissionForm.controls;

    var deger = Object.keys(controls).filter(m => m != "email_type_uid")
      .filter(m => m != "email_type_uid")
    return deger;
  }






  save() {
    if (this.data.user2) {

      this.edituserProfile();
    }

    else {
      this.manualContactAdd();

    }



  }

  manualContactAdd() {
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
        // Swal.fire({
        //   title: this.translate.getValue("TEXT.TRANSACTION_SUCCESSFUL"),
        //   icon: 'success',
        //   showConfirmButton: false,
        //   timer: 2500
        // })
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
  
  profilePhotoForm:FormGroup = new FormGroup({ 
    file_data:new FormControl("",Validators.compose([Validators.required])),
    file_ext:new FormControl("",Validators.compose([Validators.required])),

  })


  edituserProfile() {

    this.permissionForm.get("ma_user_uid")?.setValue(this.data.user2);

    this.permissionService.update(this.permissionForm.value).subscribe(res => {

      console.log('edituserProfile',res)

      if (res.success) {

      


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
