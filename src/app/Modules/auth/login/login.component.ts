import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenModel } from 'src/app/Model/tokenModel';
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
  tokenModel:TokenModel = new TokenModel();
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
       email: ["", Validators.compose([ Validators.required])]	,
        password:["", Validators.compose([ Validators.maxLength(100)])], 

		});
   
	}

isLoginSuccess:any = true;;
  submit()
  {


    this.router.navigate(['/admin']);
    return ;
    var loginModel = this.loginForm.value;

    this.authService.login(loginModel).subscribe(res=>{      
      console.log('login',res);
        if(res.success)
        {
          this.tokenModel = res.data as TokenModel;

          this.localStorageService.setItem("tokenModel",this.tokenModel);
          this.identityService.set(this.tokenModel.token);
                   console.log('res',this.tokenModel);
                   this.router.navigate(['/fair']);
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
