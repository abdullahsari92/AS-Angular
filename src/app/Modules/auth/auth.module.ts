import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { PartialsModule } from 'src/app/Partials/partials.module';


const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				component: LoginComponent,
			
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname}
			},
			// {
			// 	path: 'register',
			// 	component: RegisterComponent
			// },
			// {
			// 	path: 'forgot-password',
			// 	component: ForgotPasswordComponent,
			// },
			// {
			// 	path: 'reset-password/:c1',
			// 	component: ResetPasswordComponent,
			// },
			// {
			// 	path: 'activate/:c1/:c2',
			// 	component: ActivateComponent,
			// },

		]
	}
];


@NgModule({
  declarations: [AuthComponent, LoginComponent,],
  imports: [
		RouterModule.forChild(routes),
		FormsModule,
		PartialsModule,
    ThemeModule
  ]
})
export class AuthModule { }
