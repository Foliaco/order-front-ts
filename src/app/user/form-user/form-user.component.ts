import { Component, OnInit } from '@angular/core';
import { IDependecies, IStations } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { IPerson, IPersonSend, IRols, ITypeDocument } from 'src/app/auth/interfaces/persona/Person.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { BussinesResponse } from 'src/app/dashboard/interfaces/ResponseBussines.interface';
import { BussinesService } from 'src/app/dashboard/services/bussines/bussines.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  count:number=1;
  typeDocuments:ITypeDocument[];
  _bussines:BussinesResponse[];
  station:IStations[]=[];
  dependecies:IDependecies[];
  rol:IRols[];
  description:string;
  states:{state:boolean,className:string}={state:false,className:'danger'};
  edit:boolean=false;
  options:string="names";
  name:string='';
  users:IPerson[]=[];
  userEdit:IPerson|undefined;
  constructor(
    private userServices: UsersService,
    private lc: LocalStorageService,
    private bussines:BussinesService,
    private auth:LoginService
  ) { }

  fillPerson(person:IPerson){
    console.log(person);
  }

  sendPerson(e:any){
    e.preventDefault();
    let data=new FormData(e.target);

    const person:IPersonSend={
      status:this.states.state||false,
      idBussine:parseInt(data.get('bussines')?.toString()||'1'),
      phone:data.get('phone')?.toString()||'error en capturar',
      document:data.get('document')?.toString()||'error en capturar',
      names:data.get('names')?.toString()||'error en capturar',
      lastnames:data.get('lastnames')?.toString()||'error en capturar',
      email:data.get('email')?.toString()||'error en capturar',
      idTypeDocument:data.get('idTypeDocument')?.toString()||'error en capturar',
      idStation:parseInt(data.get('station')?.toString()||'0'),
      idDependecie:parseInt(data.get('dependencies')?.toString()||'0'),
      rol:data.get('idRol')?.toString()||'error en capturar',
      idSupplier:parseInt(this.lc.get('idSupplier')===''?'1':this.lc.get('idSupplier')),
      username:data.get('username')?.toString()||'error en capturar',
      password:data.get('password')?.toString()||'error en capturar'
    }
    this.userServices.SetPerson(this.lc.get('idPerson'),this.lc.get('token'),person)
    .subscribe(
      {
        next:res=>{
          console.log(res);
        },
        error:err=>{
          console.log(err);
        }
      }
    )
  }

  setTypeDocument(){
    this.userServices.getTypeDocument(this.lc.get('idPerson')).
    subscribe(
      {
        next:res=>{
          //console.log(res);
          if(res.column==='Token'){
            alert(res.msj)
            return;
          }
          this.typeDocuments=res.data;
        },
        error:err=>{
          console.log(err)
        }
      }
    )
  }

  setBussines(){
    this.bussines.GetBussinesXIdPerson(this.lc.get('idPerson'),this.lc.get('token'),'CREATE')
    .subscribe(
      {
        next:res=>{
          //console.log(res);
          if(res.column==='Token'){
            alert(res.msj)
            return;
          }
          if(res.column===undefined && res.data===undefined){
            alert(res.msj)
            return;
          }
          console.log(res)
          this._bussines=res.data;
          //console.log(this._bussines)
          this.station=this._bussines[0].Stations;
          //this.typeDocuments=res.data;
        },
        error:err=>{
          console.log(err)
        }
      }
    )
  }

  setStation(event:any){
    let idBussines:number=parseInt(event.target.value);
    this.station=this._bussines.filter(e=>e.idBussine===idBussines)[0].Stations;
  }

  setDependencies(event:any){
    let idStation:number=parseInt(event.target.value);

    this.bussines.GetDependencies(idStation,this.lc.get('token'))
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        this.dependecies=res.data;
      },
      error:err=>{
        console.log(err);
        alert("Error en el servidor, porfavor intentelo mas tarde");
      }
    })
  }

  setRol(){
    this.userServices.GetRolXIdPerson(this.lc.get('idPerson'),this.lc.get('token'))
    .subscribe(
      {
        next:res=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          this.rol=res.data;
        },
        error:err=>{
          alert("Error de servicio")
          console.log(err)
        }
      }
    )
  }

  setDescripcion(event:any){
    let idRol=event.target.value;
    let temp=this.rol.filter(e=>e.idRol===idRol);
    this.description=temp[0].description;
  }

  changeState(){
    // if(this.edit&&this.count===1){
    //   this.states={
    //     state:false,
    //     className:"green"
    //   }
    //   return
    // }
    if(this.states.state===true){
      this.states={
        state:false,
        className:"danger"
      }
      return
    }
    if(this.states.state===false){
      this.states={
          state:true,
          className:"green"
      }
      return
    }
  }

  setOption(opt:string){
    this.options=opt;
    console.log(this.options)
  }

  searchPerson(){
    this.userServices.GetPerson(this.lc.get('token'),this.name===''?'name':this.name,this.options,this.lc.get('idPerson'))
    .subscribe(
      {
        next:res=>{

          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          console.log("uwu",res)
          this.users=res.data;
        },
        error:err=>{
          console.log(err);
          alert("Ocurrio un error en el servidor");
        }
      }
    )
  }

  enter(event:any){
    if(event.key==='Enter'){
      this.searchPerson();
    }
  }

  ngOnInit(): void {
    this.setTypeDocument();
    this.setBussines();
    this.setRol();
    console.log(this.states)

  }

}
