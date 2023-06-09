import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguagesService } from 'src/app/services/languages.service';
import { TranslateService } from 'src/app/services/translate.service';
import Swal from 'sweetalert2';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { LanguageComponent } from '../language.component';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  languageTypes:any[]=[];

  languageForm!: FormGroup;
  isUpdate:boolean =false;
  constructor(private fb:FormBuilder,private languagesService:LanguagesService,
    public dialogRef: MatDialogRef<LanguageComponent>,
    private translate:TranslateService,
    public asSettingsService:AsSettingsService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

   

  ngOnInit(): void {

    this.initLanguageForm()
  }

  initLanguageForm() {

		this.languageForm = this.fb.group({
     // uid: ["", Validators.compose([ Validators.required])],
      keyword: ["TEXT.", Validators.compose([ Validators.required])],
      // description: ["field name", Validators.compose([ Validators.required])],    
      tr: ["", Validators.compose([ Validators.required])],
      en: ["", Validators.compose([ Validators.required])],
      de: [""],
      fr: [""] ,
      es: [""],


		});
  console.log('add satır - 38',this.data)
    if(this.data.id)
    {

      this.data.type = parseInt(this.data.type);

      this.isUpdate=true;
      this.languageForm.addControl("id",new FormControl());
      const controls = this.languageForm.controls;

      Object.keys(controls).forEach(controlName =>{
          controls[controlName].setValue(this.data[controlName])
        });


    }
   
	}

  ObjectContorls()
  {
    const controls = this.languageForm.controls;

    return Object.keys(controls).filter(p=> p !="type");
  }



  save()
  {

    if(this.data.id)
    {
          this.update();
    }
    else
    {
      this.add();
    } 

  }

  add()
  {
    this.languagesService.add(this.languageForm.value).subscribe(res=>{

      if(res.success)
      {
        this.dialogRef.close({		
          data:res.success
        });	

        Swal.fire({
          title: this.translate.getValue("TXT_TRANSACTION_SUCCESSFUL"),
          icon: 'success',
          showConfirmButton: false,

          timer: 2500
        })
      }
      else
      {
        Swal.fire({
          icon: 'error',
          showConfirmButton: true,
         // html:this.translate.getValue(res.error.code) + "<br>" + this.asSettingsService.hataObjectGoster(res.error),
        
        })
      }

    })

  }
  update()
  {
    this.languagesService.update(this.languageForm.value).subscribe(res=>{

      if(res.success)
      {

          this.dialogRef.close({		
            data:res.success
          });		
  
      }

    })

  }

  singIn()
  {


  }

}
