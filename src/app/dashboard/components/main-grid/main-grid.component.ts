import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { IBussines } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.css']
})
export class MainGridComponent implements OnInit {

  constructor() { }
  @Input() bussines:IBussines[];
  _bussines:IBussines[];

  fillBussines(){
    this._bussines = this.bussines
    //window.location=window.location;
    console.log(this._bussines)
  }

  ngOnInit():void{
  }

}
