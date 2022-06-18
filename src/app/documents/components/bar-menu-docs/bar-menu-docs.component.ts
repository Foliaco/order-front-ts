import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/auth/interfaces/Login.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-bar-menu-docs',
  templateUrl: './bar-menu-docs.component.html',
  styleUrls: ['./bar-menu-docs.component.css']
})
export class BarMenuDocsComponent implements OnInit {


  constructor(
    private router: Router,
    private lc:LocalStorageService
    ) { }

  idPerson:string=this.lc.get('idPerson');
  getPage(url:string,id?:string){
    if(id===undefined){
    this.router.navigate([url]);
      return;
    }
    this.router.navigate([url,id]);
  }

  exit(){
    this.lc.clearAll();
  }

  ngOnInit(): void {
  }

}
