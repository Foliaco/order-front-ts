import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBussines } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() bussine:IBussines;

  constructor(
      private router:Router,
      private lc:LocalStorageService
  ) { }

  rol:string=this.lc.get('rol');
  getPage(url:string,id?:number){
    if(id!==undefined){
      this.router.navigate([`${url}/${id}`])
      return;
    }
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
  }

}
