import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/Model/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { IdentityService } from 'src/app/services/identity.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css','./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm!: FormGroup;
  authModel:AuthModel = new AuthModel();
  lang:any; 
  constructor(private fb:FormBuilder, 
    private router:Router,

    
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private identityService:IdentityService,
    private translateService:TranslateService
    ) {


      this.lang = this.localStorageService.getItem("languagesDefinitions");
     }


  ngOnInit(): void {
    this.initRegisterForm();

  }

  initRegisterForm() {

		this.loginForm = this.fb.group({
       email: ["abdullahsari@gmail.com", Validators.compose([ Validators.required])]	,
        password:["5514421019", Validators.compose([ Validators.maxLength(100)])], 

		});
   
	}

isLoginSuccess:any = true;;
  submit()
  {


  // this.router.navigate(['/admin']);
    var loginModel = this.loginForm.value;

    this.authService.login(loginModel).subscribe(res=>{      
      console.log('login',res);
        if(res.success)
        {
          this.authModel = res.data as AuthModel;

          this.localStorageService.setItem("authModel",this.authModel);
          this.identityService.set(this.authModel.token);
                   console.log('res',this.authModel);
                   this.router.navigate(['/admin/user']);
        }
        else{
          this.isLoginSuccess= false;          
        }
    },err=>{
      this.isLoginSuccess= false;          

    })



  }

  singUp(): void {

    console.log('buton action');
    this.router.navigate(['../register']);
  }

}
