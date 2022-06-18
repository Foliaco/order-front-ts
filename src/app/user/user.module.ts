import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { MainUserComponent } from './main-user/main-user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { TableUserComponent } from './table-user/table-user.component';



@NgModule({
  declarations: [
    NavbarUserComponent,
    MainUserComponent,
    FormUserComponent,
    TableUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
