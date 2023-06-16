import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleComponent } from '../role.component';
import { RoleService } from 'src/app/services/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from 'src/app/Model/permission';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TranslateService } from 'src/app/services/translate.service';
import { PermissionService } from 'src/app/services/permission.service';
import { tap } from 'rxjs';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  permissionList:Permission[]=[];
  lang: any
  roleForm!: FormGroup;
  currentCode: string = "";
  isActiveButon = "";
  statusLanguages: any[] = [];
  imgUrl:any;
  constructor(private fb: FormBuilder,
    public asSettingsService: AsSettingsService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<RoleComponent>,
    private translate: TranslateService,
    private roleService:RoleService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionService:PermissionService,



  ) {
    this.lang = this.localStorageService.getItem("languagesDefitions");

  }


  ngOnInit(): void {
    this.initroleForm();
    this.statusLanguages = this.asSettingsService.statusLanguages;


    this.getPermissionList();
  }



  getPermissionList()
  {

    this.roleService.getById(this.data.id).pipe(tap(res=>{
      this.permissionList = res.data.items;

      console.log('getList ',res)
      
    })).subscribe();
  }
   
  setAll(completed: boolean,permission:Permission) {
    //this.allComplete = completed;
    // if (this.permission.subtasks == null) {
    //   return;
    // }
    this.permissionList.filter(p=>p.controllerName==permission.controllerName).forEach(t => (t.checked = completed));
  }

  initroleForm() {
  
    this.roleForm = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      level: [""],

   

    });


    if (this.data.id) {

      console.log('gelenData', this.data)
      this.roleForm.addControl("id", new FormControl());

      const controls = this.roleForm.controls;

  
      Object.keys(controls).forEach(controlName => {

        controls[controlName].setValue(this.data[controlName])
      });


    }

  }


  ObjectContorls() {
    const controls = this.roleForm.controls;

    var deger = Object.keys(controls).filter(m => m != "email_type_uid");
    return deger;
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
		const controls = this.roleForm.controls;

    if (this.roleForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}


    this.roleService.add(this.roleForm.value).subscribe(res => {
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


  update() {

    this.roleForm.get("ma_user_uid")?.setValue(this.data.user2);

    this.roleService.update(this.roleForm.value).subscribe(res => {

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
