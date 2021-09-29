import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";
import {BoardModComponent} from "./board-mod/board-mod.component";
import {BoardUserComponent} from "./board-user/board-user.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModComponent,
    BoardUserComponent,],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
