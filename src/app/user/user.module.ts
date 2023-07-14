import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path : 'signin',
    component : SigninComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'forgot-password',
    component : ForgotPasswordComponent
  },
  {
    path : 'update-password/:token',
    component : UpdatePasswordComponent
  },
  {
    path : 'update-profile',
    component : UpdateProfileComponent
  },
  {
    path: 'change-password',
    component : ChangePasswordComponent
  }
]

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
