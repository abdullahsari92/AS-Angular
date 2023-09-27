import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleComponent } from '../role.component';
import { RoleService } from 'src/app/services/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TranslateService } from 'src/app/services/translate.service';
import { PermissionService } from 'src/app/services/permission.service';
import { tap } from 'rxjs';
import { ControllerCRUD, PermissionModel } from 'src/app/Model/permission.model';
import { CRUDActionType } from 'src/app/Model/Enums/CRUDActionType.enum';
import { Role } from 'src/app/Model/Entity/role';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  permissionModelList:PermissionModel[]=[];
  role:Role = new Role();
  lang: any
  roleForm!: FormGroup;
  currentCode: string = "";
  isActiveButon = "";
  statusLanguages: any[] = [];
  imgUrl:any;
id!:string;
  CRUDActionType=CRUDActionType;
  crudActionTypeList = this.asSettingsService.getSelectBoxByEnumType(CRUDActionType);

  constructor(private fb: FormBuilder,
    public asSettingsService: AsSettingsService,
    private localStorageService: LocalStorageService,
    // public dialogRef: MatDialogRef<RoleComponent>,
    private translate: TranslateService,
    private roleService:RoleService, 
    private route:ActivatedRoute,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionService:PermissionService,



  ) {
    this.lang = this.localStorageService.getItem("languagesDefinitions");

  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{

        this.id = params.get("id")??"";   

         this.getPermissionList(this.id);

    })

      this.initroleForm();


  }



  getPermissionList(id:string)
  {

    this.roleService.getById(id).pipe(tap(res=>{
      this.permissionModelList = res.data.permissionList;

      this.role = res.data.roleDto;   

      this.permissionModelList.forEach(t => {
        t.indeterminate = t.controllerCrudList.filter(p=>p.checked).length >0 && t.controllerCrudList.filter(p=>p.checked).length <4;      
            });
            
    if (this.role.id) {

      this.roleForm.addControl("id", new FormControl());
      const controls = this.roleForm.controls;
  
      Object.keys(controls).forEach(controlName => {

        let data:any = this.role;
        controls[controlName].setValue(data[controlName])
      });


    }
      console.log('getList ',res)
      
    })).subscribe();
  }
   
  setAll(completed: boolean,controllerName:string) {
  

    this.permissionModelList.filter(p=>p.controllerName==controllerName).map(p=>p.controllerCrudList)[0].forEach(t => (
      t.checked = completed));
    this.permissionModelList.filter(p=>p.controllerName==controllerName).forEach(p=>{
      p.checked =completed;
      p.indeterminate = p.controllerCrudList.filter(p=>p.checked).length >0 && p.controllerCrudList.filter(p=>p.checked).length <4
    }
    );


  }

  someComplete(permissionModel:PermissionModel):boolean
  {

   return permissionModel.controllerCrudList.filter(p=>p.checked).length >0 && permissionModel.controllerCrudList.filter(p=>p.checked).length <4;

  }

  actionCheckedSet(checked:any ,permission:ControllerCRUD,permissionModel:PermissionModel)
  {
console.log('permission ',permission)

    this.permissionModelList.filter(p=>p.controllerName==permissionModel.controllerName).forEach(t => {

t.controllerCrudList.filter(m=>m.crudActionType == permission.crudActionType)[0].checked = checked;
t.indeterminate = t.controllerCrudList.filter(p=>p.checked).length >0 && t.controllerCrudList.filter(p=>p.checked).length <4;
t.checked = t.controllerCrudList.filter(p=>p.checked).length >0;


    });

    // permissionModel.checked = permission.checked;
    // permissionModel.indeterminate = permissionModel.controllerCrudList.filter(p=>p.checked).length >0 && permissionModel.controllerCrudList.filter(p=>p.checked).length <4
 console.log('actionCheckedSet',this.permissionModelList)
  }

  initroleForm() {
  
    this.roleForm = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      level: [""],

   

    });



  }


  ObjectContorls() {
    const controls = this.roleForm.controls;

    var deger = Object.keys(controls).filter(m => m != "email_type_uid");
    return deger;
  }



  getCamelCase(text:string)
  {
     return text[0].toUpperCase() + text.substring(1);

  }



  save() {
    if (this.id) {

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

        // this.dialogRef.close({
        //   data: res.data
        // });
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

   


    var roleUpdateModel = { PermissionList :this.permissionModelList, RoleDto:this.roleForm.value };
    this.roleService.update(roleUpdateModel).subscribe(res => {

      console.log('edituserProfile',res)

      if (res.success) {

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
