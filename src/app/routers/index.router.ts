import { Routes } from "@angular/router";
import { LoginComponent } from "../auth/components/login/login.component";
import { DependencieComponent } from "../dashboard/components/dependencie/dependencie.component";
import { FilterDocsComponent } from "../documents/components/filter-docs/filter-docs.component";
import { MainComponent } from "../dashboard/components/main/main.component";
import { StationsComponent } from "../dashboard/components/stations/stations.component";
import { FormDocumentComponent } from "../documents/components/form-document/form-document.component";
import { MainUserComponent } from "../user/main-user/main-user.component";

export const route: Routes = [
  {path:'',component:LoginComponent},
  {path:'main',component:MainComponent},
  {path:'main/bussines/:id',component:StationsComponent},
  {path:'main/bussines/station/:id',component:DependencieComponent},
  {path:'main/bussines/station/dependecies/:id',component:FilterDocsComponent},
  {path:'document/:id',component:FormDocumentComponent},
  {path:'document-edit/:id',component:FormDocumentComponent},
  {path:'dashboard/master-users',component:MainUserComponent},
];
