import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'user',
    loadChildren:() => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    component : HomeComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [authGuard]
  },
  {
    path : 'home',
    component : SidebarComponent
  }

  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
