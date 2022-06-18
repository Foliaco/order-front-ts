import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBussines } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageType } from 'src/app/shared/types/LocalStorage.type';
import { BussinesService } from '../../services/bussines/bussines.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private bussine:BussinesService,
    private person:LoginService,
    private lc:LocalStorageService,
    private router:Router
  ) { }

  bussines:IBussines[];
  private idPerson:string;
  getPerson():void{
    //console.log("okey")
    let user=this.lc.get('user');
    let token=this.lc.get('token');
    if(user==null){
      alert("Id invalido")
      return;
    };
    if(token===null){
      alert("Id invalido")
      return;
    }
    this.idPerson=JSON.parse(user).idPerson;

    this.person.GetOnePerson(this.idPerson,token)
    .subscribe({
      next:res=>{
        if(res.column!==undefined){
          alert("Su session a caucado");
          return;
        }
        let {data}=res;
        let objec:LocalStorageType[]=[
          {key:'names',value:data.names},
          {key:'lastnames',value:data.lastnames},
          {key:'idBussine',value:data.idBussine},
          {key:'document',value:data.document},
          {key:'idSupplier',value:data.idSupplier},
          {key:'email',value:data.email},
          {key:'phone',value:data.phone},
          {key:'idRol',value:data.idRol},
          {key:'createdAt',value:data.createdAt.toString()},
          {key:'updatedAt',value:data.updatedAt.toString()},
          {key:"station",value:JSON.stringify(data.Station)},
          {key:"bussines",value:JSON.stringify(data.Bussine)},
          {key:"supplier",value:JSON.stringify(data.Supplier)},
          {key:'idDependecie',value:data.idDependecie}
        ];
        console.log(data.Station)
        this.lc.set(objec)
        return true;
      },
      error:err=>{
        alert("Error en la conexion");
        console.log(err);
      }
    })
  }
  getBussines():void{
    let idSupplier=parseInt(this.lc.get('idSupplier')||'0');
    this.bussine.GetBussines(idSupplier,this.lc.get('token'),this.idPerson)
    .subscribe({
      next:res=>{
        this.bussines=res.data;
        //console.log("res desde main ",this.bussines)
      },
      error:err=>console.log(err)
    })
  }
  ngOnInit(): void {
    this.person.GetSession(this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        if(res.user==="users"){
          return;
        }
        if(res.column==="Token"){
          this.person.Logout(this.lc);
          return
        }
      },
      error:err=>{
        console.log(err)
        alert("Su session a caucado")
        this.router.navigate(['']);
      }
    })
    this.getPerson();
    this.getBussines();
  }

}
