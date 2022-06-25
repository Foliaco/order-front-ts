import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBussinesComponent } from './components/form-bussines/form-bussines.component';
import { NavbarBussinesComponent } from './components/navbar-bussines/navbar-bussines.component';
import { FormsModule } from '@angular/forms';
import { LoadingBussinesComponent } from './components/loading-bussines/loading-bussines.component';
import { SpecialCaracteres } from '../shared/directives/special-caracteres.directive';
import { StationsFormComponent } from './components/stations/stations.component';



@NgModule({
  declarations: [
    FormBussinesComponent,
    NavbarBussinesComponent,
    LoadingBussinesComponent,
    StationsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BussinesModule { }
