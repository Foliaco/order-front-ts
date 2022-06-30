import { Component, OnInit } from '@angular/core';
import { IBussines, IDependecies, IStations } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
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

  visible='hidden';
  count:number=1;
  typeDocuments:ITypeDocument[];
  _bussines:BussinesResponse[];
  station:IStations[]=[];
  dependecies:IDependecies[];
  rol:IRols[];
  // rolEdit:IRols;
  // depEdit:IDependecies[];
  // stationEdit:IStations;
  // bussinesEdit:IBussines;
  // typeDocumentEdit:ITypeDocument;
  idPersonEdit:string;
  description:string;
  states:{state:boolean,className:string}={state:false,className:'danger'};
  edit:boolean=false;
  options:string="names";
  name:string='';
  newPassword:string='';
  users:IPerson[]=[];
  userEdit:IPersonSend={
    names:'',
    lastnames:'',
    idBussine:0,
    document:'',
    email:'',
    idDependecie:0,
    idStation:0,
    idSupplier:0,
    idTypeDocument:'',
    password:'',
    phone:'',
    rol:'',
    username:'',
    status:false
  };
  check:{msj:string,check:boolean}={msj:'',check:false}
  constructor(
    private userServices: UsersService,
    private lc: LocalStorageService,
    private bussines:BussinesService,
    private auth:LoginService
  ) { }

  close(){
    this.visible='hidden';
  }

  fillPerson(personInput:IPersonSend){
    this.visible='';
    this.userEdit=personInput;
    this.setStation(undefined,personInput.idBussine);
    this.setDependencies(undefined,personInput.idStation);
    // this.edit=true;
    // this.typeDocumentEdit=this.typeDocuments.filter(e=>e.idTypeDocument===this.userEdit.idTypeDocument)[0];
    // this.bussinesEdit=this._bussines.filter(e=>e.idBussine===this.userEdit.idBussine)[0];
    // this.stationEdit=this.station.filter(e=>e.idStation===this.userEdit.idStation)[0];
    // this.depEdit=this.dependecies.filter(e=>e.idDependecie===this.userEdit.idDependecie);
    // this.rolEdit=this.rol.filter(e=>e.idRol===this.userEdit.rol)[0];
  }

  editPerson(){
    this.userEdit.password;
    this.idPersonEdit=this.userEdit.password
    this.sendEditPerson()
  }
  sendEditPerson(){
    console.log(this.userEdit)
    this.userServices.SetPersonEdit(this.lc.get('idPerson'),this.lc.get('token'),this.userEdit,this.idPersonEdit)
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        alert(res.msj);
        this.searchPerson();
      },
      error:err=>{
        console.log(err);
        alert('error en la edicion de usuario');
      }
    })
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
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          alert(res.msj)
        },
        error:err=>{
          console.log(err);
          alert('Error en los servicios');
        }
      }
    )
  }

  changeDependencie(_data:number){
    this.userEdit.idDependecie=_data;
  }
  changeStation(_data:number){
    this.userEdit.idStation=_data;
  }
  changeBussine(_data:number){
    this.userEdit.idBussine=_data;
  }
  changeTypeDoc(_data:string){
    this.userEdit.idTypeDocument=_data;
  }
  changeRol(_data:any){
    let data=_data.target.value;
    this.userEdit.rol=data;
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
          this._bussines=res.data;
          //console.log(this._bussines)
          this.setStation(undefined,this._bussines[0].idBussine);
          console.log(this.station[0].idStation)
          //this.typeDocuments=res.data;
        },
        error:err=>{
          console.log(err)
        }
      }
    )
  }

  setStation(event:any,_idBussines:number=0){
    let idBussines:number=event===undefined?_idBussines:parseInt(event.target.value);
    this.station=this._bussines.filter(e=>e.idBussine===idBussines)[0].Stations;
    console.log(this.station)
  }

  setDependencies(event:any,_idStation:number=0){
    let idStation:number=event===undefined?_idStation:parseInt(event.target.value);
    console.log(idStation)
    this.bussines.GetDependencies(this.lc.get('idPerson'),idStation,this.lc.get('token'))
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        this.dependecies=res.data;
        console.log(this.dependecies)
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

  changeStateEdit(bol:boolean){
    if(bol){
      this.userEdit.status=false;
    }
    else{
      this.userEdit.status=true;
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

  verifyText(opt:string,event:any){
    let especiales=`[]{}´,?'¿"|°!#$%&/()=?;:?¿´?\`\\*+<>`;

    if(event.target.value.length===0){
      return;
    }

    if(especiales.indexOf(event.target.value)!==-1){
      this.check={
        msj:'No se acepta caracteres especiales',
        check:false
      }
      return;
    }

    switch(opt){
      case 'email':
        let reg1=/[a-z]\w+\@[a-z]\w+\.[a-z]\w+/gi;
        let reg2=/[a-z]\w+\@[a-z]\w+\.[a-z]\w+\.[a-z]\w+/gi;

        if(reg1.test(event.target.value)||reg2.test(event.target.value)){
          this.check={
            msj:'',
            check:true
          }
          return;
        }
        this.check={
          msj:'El correo es invalido',
          check:false
        }

    }
  }

  changePass(){
    if(this.newPassword==''){
      alert('No puedes enviar datos vacios');
      return;
    }
    console.log(this.newPassword)
    this.userServices.UpdatePassword(this.lc.get('token'),this.userEdit.password,this.newPassword)
    .subscribe(
      {
        next:res=>{
          if(res.column==='Token'){
            alert('Se vencio el inicio de session');
            this.newPassword='';
            this.auth.Logout(this.lc);
            return;
          }
          console.log(res)
          alert(res.msj);
          this.newPassword='';
          return;
        },
        error:err=>{
          console.log(err);
          alert('Error en el servicio, por favor intente mas tarde por favor consulte con el area asignada');
          this.newPassword='';
        }
      }
    )
  }

  ngOnInit(): void {
    this.setTypeDocument();
    this.setBussines();
    this.setRol();
    console.log(this.states)

  }

}
