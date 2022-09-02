import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {AdminDashboardComponent} from "./pages/admin/admin-dashboard/admin-dashboard.component";
import {UserDashboardComponent} from "./pages/user/user-dashboard/user-dashboard.component";

const routes: Routes =[
  {path: 'signup', component: SignupComponent, pathMatch: 'full',},
  {path: 'login',component: LoginComponent, pathMatch: 'full',},
  {path: '', component: HomeComponent, pathMatch: 'full',},
  {
    path: 'admin/admin',component: AdminDashboardComponent,pathMatch: 'full'
  },
  {
    path: 'user',component: UserDashboardComponent,pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
