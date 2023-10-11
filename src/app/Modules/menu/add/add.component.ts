import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent  implements OnInit{

  /**
   *
   */

  form!:FormGroup;
  constructor(private fb: FormBuilder,



  ) 
  
  {
    
  }
  ngOnInit(): void {

    
    this.initForm();
  }

  initForm() {
  
    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      menuUrl: ["", Validators.compose([Validators.required])],
      description: [""],
      parentId: ["", Validators.compose([Validators.required])],

      icon: [""],

   

    });



  }

save()
{


}

}
