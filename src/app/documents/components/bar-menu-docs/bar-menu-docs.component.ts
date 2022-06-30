import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-bar-menu-docs',
  templateUrl: './bar-menu-docs.component.html',
  styleUrls: ['./bar-menu-docs.component.css']
})
export class BarMenuDocsComponent implements OnInit {


  constructor(
    private router: Router,
    private location:Location,
    private lc:LocalStorageService
    ) { }

  idPerson:string=this.lc.get('idPerson');

  back(){
    this.location.back();
  }

  getPage(url:string,id?:string){
    if(id===undefined){
    this.router.navigate([url]);
      return;
    }
    this.router.navigate([url,id]);
  }

  exit(){
    this.lc.clearAll();
    alert('Cerro sesion con exito');
    this.router.navigate([''])
  }

  ngOnInit(): void {
  }

}
