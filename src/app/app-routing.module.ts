import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { route } from './routers/index.router';



@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
