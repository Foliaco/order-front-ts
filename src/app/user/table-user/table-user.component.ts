import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from 'src/app/auth/interfaces/persona/Person.interfaces';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {

  constructor() { }
  @Input() users:IPerson[];

  fillPerson(person:IPerson){
    console.log(person)
  }

  ngOnInit(): void {
    //console.log(this.users)
  }

}
