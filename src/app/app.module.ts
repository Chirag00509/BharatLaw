import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
