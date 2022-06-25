import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-bussines',
  templateUrl: './loading-bussines.component.html',
  styleUrls: ['./loading-bussines.component.css']
})
export class LoadingBussinesComponent implements OnInit {
  @Input() hidden:string='hidden';
  constructor() { }

  ngOnInit(): void {
  }

}
