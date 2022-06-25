import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-navbar-bussines',
  templateUrl: './navbar-bussines.component.html',
  styleUrls: ['./navbar-bussines.component.css']
})
export class NavbarBussinesComponent implements OnInit {

  idPerson:string;

  constructor(
    private lc:LocalStorageService,
    private router:Router,
    private auth:LoginService,
    private location:Location
  ) { }

  back(){
    this.location.back();
  }
  exit(){
    this.auth.Logout(this.lc);
    this.router.navigate(['/login']);
  }
  getPage(url:string){
    this.router.navigate([url]);
  }
  ngOnInit(): void {
  }

}
