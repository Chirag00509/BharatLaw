import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';

const routes: Routes = [
  {
    path : 'forgot-password',
    component : ForgotPasswordComponent
  },
  {
    path : 'update-password/:token',
    component : UpdatePasswordComponent
  },
    {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'signin',
    component : SigninComponent
  }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
