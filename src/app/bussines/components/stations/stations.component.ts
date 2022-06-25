import { Component, Input, OnInit } from '@angular/core';
import { IBussines } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';

@Component({
  selector: 'app-stations-form',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsFormComponent implements OnInit {

  @Input() bussines:IBussines[]

  constructor() { }

  ngOnInit(): void {
  }

}
