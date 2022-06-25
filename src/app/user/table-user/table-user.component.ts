import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPerson, IPersonSend } from 'src/app/auth/interfaces/persona/Person.interfaces';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {

  constructor() { }
  @Input() users:IPerson[];
  @Output() InputPerson:EventEmitter<IPersonSend>=new EventEmitter<IPersonSend>();
  fillPerson(person:IPerson){
//    console.log(person)
    let personSend:IPersonSend={
      names:person.names,
      lastnames:person.lastnames,
      idBussine:person.idBussine,
      idStation:person.idStation,
      idTypeDocument:person.idTypeDocument,
      document:person.document,
      email:person.email,
      idDependecie:person.idDependecie,
      idSupplier:person.idSupplier,
      username:person.user.username,
      phone:person.phone,
      rol:person.idRol,
      status:person.status,
      password:person.idPerson
    }
    this.InputPerson.emit(personSend)
  }

  ngOnInit(): void {
    //console.log(this.users)
  }

}
