import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DocumentsModule } from './documents/documents.module';
import { OnlyNumberDirective } from './shared/directives/only-number.directive';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    OnlyNumberDirective
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AuthModule,
    DashboardModule,
    DocumentsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
