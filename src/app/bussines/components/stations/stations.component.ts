import { Component, Input, OnInit } from '@angular/core';
import { IBussines, IDependecies, IStations } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { BussinesService } from 'src/app/dashboard/services/bussines/bussines.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-stations-form',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsFormComponent implements OnInit {

  _editStation:boolean=false;
  _editDependecie:boolean=true;
  time=new Date();
  bussines:IBussines[]=[];
  bussine_add:IBussines={
    name:'Seleccione una empresa',
    idBussine:0,
    idSupplier:0,
    nit:'',
    address:'',
    email:'',
    createdAt:new Date(),
    phone:'',
    updatedAt:new Date()
  };
  station_add:IStations={
    idStation:0,
    idBussine:0,
    name:'Seleccione una sede',
    nit:this.bussine_add.nit?.toString()||'',
    address:'',
    email:'',
    createdAt:new Date(),
    phone:'',
    updatedAt:new Date()
  };
  station:IStations[]=[];
  _station_add:IStations={
    idStation:0,
    idBussine:0,
    name:'Seleccione una sede',
    nit:this.bussine_add.nit?.toString()||'',
    address:'',
    email:'',
    createdAt:new Date(),
    phone:'',
    updatedAt:new Date()
  };
  dep:IDependecies[]=[];
  dep_add:IDependecies={
    idDependecie:0,
    name:'',
    idStation:0,
    createdAt:new Date(),
    updatedAt:new Date()
  }

  hiddenForm='hidden';
  hiddenForm2='hidden';

  hidden='hidden';
  constructor(
    private bussinesServices:BussinesService,
    private lc:LocalStorageService,
    private auth:LoginService
  ) { }
  addStation(){
    if(this.bussine_add.idBussine===0){
      alert('Selecciona una empresa primero')
      return;
    }
    this.hiddenForm ='';
  }
  addDependecies(){
    if(this.bussine_add.idBussine===0){
      alert('Selecciona una empresa primero')
      return;
    }
    if(this.station.length===0){
      alert('Selecciona una sede primero')
      return;
    }
    this.hiddenForm2='';
    this.dep_add.idStation=this.station_add.idStation;
    console.log(this.dep_add);
  }
  showFormEdit(_dep:IDependecies){
    this.hiddenForm2='';
    this._editDependecie=true;
    this.dep_add=_dep;
  }
  editDependecies(){
    this.hidden='';
    this.bussinesServices.UpdateDependencie(this.lc.get('idPerson'),this.lc.get('token'),this.dep_add)
    .subscribe(
      {
        next:(res:any)=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          console.log(res)
          this.hidden='hidden'
          alert(res.msj)
        },
        error:err=>{
          console.log(err)
          this.hidden='hidden';
          alert('Error al consultar las areas');
          return;
        }
      }
    )
  }
  sendDependecies(){
    this.bussinesServices.SetDependencie(this.lc.get('idPerson'),this.lc.get('token'),this.dep_add)
    .subscribe(
      {
        next:(res:any)=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          console.log(res)
          this.hidden='hidden'
          alert(res.msj)
        },
        error:err=>{
          console.log(err)
          this.hidden='hidden';
          alert('Error al consultar las areas');
          return;
        }
      }
    )
  }
  getBussine(){
    this.hidden=''
    this.bussinesServices.GetBussines(parseInt(this.lc.get('idSupplier')===''?'0':this.lc.get('idSupplier')),this.lc.get('token'),this.lc.get('idPerson')).
    subscribe(
      {
        next:res=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return
          }
          this.bussines=res.data;
          this.hidden='hidden';
        }
      }
    )
  }
  getDependecies(idStation:number){
   let  station_temp=this.station.filter(e=>e.idStation===idStation);
   this.station_add=station_temp[0]
    this.bussinesServices.GetDependeciesByIdPerson(idStation,this.lc.get('idPerson'),this.lc.get('token'))
    .subscribe(
      {
        next:res=>{
          if(res.column==='token'){
            this.auth.Logout(this.lc);
            return;
          }
          this.dep=res.data;
          console.log(this.dep);
        },
        error:err=>{
          console.log(err)
          alert('Error al consultar las areas');
          return;
        }
      }
    )
  }
  getStation(idBussine:number){
    let bussine=this.bussines.filter((e)=>e.idBussine===idBussine);
    this.bussine_add=bussine[0];
    let station=bussine[0].Stations;

    if(station===undefined) {this.station=[];return}
    this.station=station;

  }
  sendStation(){
    this.hidden=''
    this._station_add.idBussine=this.bussine_add.idBussine;
    this._station_add.nit=this.bussine_add.nit;
    //this._station_add.idBussine=this.station_add.idS;
    console.log(this._station_add)
    this.bussinesServices.SetStation(this.lc.get('idPerson'),this.lc.get('token'),this._station_add)
    .subscribe(
      {
        next:(res:any)=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          console.log(res)
          this.hidden='hidden'
          alert(res.msj)
        },
        error:err=>{
          console.log(err)
          this.hidden='hidden';
          alert('Error al consultar las areas');
          return;
        }
      }
    )

  }
  close(){
    this.hiddenForm='hidden';
  }
  close2(){
    this.hiddenForm2='hidden';
  }
  editSation(station:IStations){
    this._editStation=true;
    this._station_add=station;
    this.hiddenForm='';
  }
  sendEditStation(){
    this.hidden='';
    this.bussinesServices.UpdateStation(this.lc.get('idPerson'),this.lc.get('token'),this._station_add)
    .subscribe(
      {
        next:(res:any)=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          console.log(res)
          this.hidden='hidden'
          alert(res.msj)
        },
        error:err=>{
          console.log(err)
          this.hidden='hidden';
          alert('Error al consultar las areas');
          return;
        }
      }
    )
  }
  ngOnInit(): void {
    setInterval(() => this.time=new Date(),1000);
    this.getBussine();
  }

}
