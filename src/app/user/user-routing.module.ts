import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {BoardModComponent} from "./board-mod/board-mod.component";
import {BoardUserComponent} from "./board-user/board-user.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'user',
    component:BoardUserComponent
  },  {
    path:'mod',
    component:BoardModComponent
  },  {
    path:'admin',
    component:BoardAdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
