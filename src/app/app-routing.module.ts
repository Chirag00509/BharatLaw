import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent
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
    path: 'user',
    loadChildren:() => import('./user/user.module').then(m => m.UserModule)
  }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
