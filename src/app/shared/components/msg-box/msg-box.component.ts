import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent implements OnInit {
  @Input() Log:string;
  @Input() Session:boolean;
  @Input() Msj:string;
  constructor() { }

  ngOnInit(): void {
  }

  hiddenMSG(){
    this.Log='';
  }

}
