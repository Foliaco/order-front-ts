import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  constructor(
    private router:Router,
    private auth:LoginService,
    private lc:LocalStorageService
    ) { }

  ngOnInit(): void {
    if(this.lc.get('token')===''){
      this.exit();
    }
  }

  getPage(url:string){
    this.router.navigate([url])
  }
  exit(){
    this.auth.Logout(this.lc);
    this.getPage('main');
  }
}
