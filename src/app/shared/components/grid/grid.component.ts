import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBussines } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() bussine:IBussines;

  constructor(
      private router:Router
  ) { }

  getPage(url:string,id:number){
    this.router.navigate([`${url}/${id}`])
  }
  ngOnInit(): void {
  }

}
