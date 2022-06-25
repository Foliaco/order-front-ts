import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBussines } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { BussinesService } from 'src/app/dashboard/services/bussines/bussines.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-form-bussines',
  templateUrl: './form-bussines.component.html',
  styleUrls: ['./form-bussines.component.css']
})
export class FormBussinesComponent implements OnInit {

  edit:boolean = false;
  hidden:string='hidden';
  hiddenForm='hidden';
  bussines:IBussines[]=[];
  bussine:IBussines={
    address:'',
    email:'',
    name:'',
    idSupplier:0,
    idBussine:0,
    nit:'',
    phone:''
  };
  constructor(
    private bussinesServices: BussinesService,
    private lc:LocalStorageService,
    private auth:LoginService,
    private router:Router
  ) { }

  getBussines(){
    this.hidden='';
    this.bussinesServices.GetBussines(parseInt(this.lc.get('idSupplier')===''?'0':this.lc.get('idSupplier')),this.lc.get('token'),this.lc.get('idPerson'))
    .subscribe({
      next:res=>{
        if(res.column=='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        this.bussines=res.data;
        this.hidden='hidden';
      },
      error:err=>{
        if(err.column=='Token'){
            this.auth.Logout(this.lc);
            return;
        }
        console.log(err);
        alert("Error en el servicio, por favor intente mas tarde")
        return
      }
    })
  }

  sendBussines(){
    this.hidden='';
    this.bussine.idSupplier=parseInt(this.lc.get('idSupplier'));
    if(this.bussine.name===''||this.bussine.idSupplier===0||this.bussine.address===''||this.bussine.email===''||this.bussine.phone===''||this.bussine.nit===''){
      alert("Ningun campo puede ir vacio");
      this.hidden='hidden'
      return;
    };
    if(this.bussine.nit.toString().length>10){
      alert('El nit no puede ser mayor a 10 caracteres')
      this.hidden='hidden'
      return;
    }
    if(this.bussine.phone.toString().length>10){
      alert('El telefono no puede ser mayor a 10 caracteres')
      this.hidden='hidden'
      return;
    }
    this.bussinesServices.SetBussine(this.lc.get('idPerson'),this.lc.get('token'),this.bussine)
    .subscribe(
      {
        next:(res:any)=>{
          if(res.column==='Token'){
            alert('Tu Session a caucado');
            this.auth.Logout(this.lc);
            return;
          }
          alert(res.msj);
          this.hidden='hidden'
        },
        error:err=>{
          this.hidden='hidden';
          alert('Ocurrio un error en el servidor, Intentelo nuevamente mas tarde')
          console.log(err)
        }
      }
    )
  }

  editBussine(_bussine:IBussines){

    this.edit=true;
    this.bussine=_bussine;
    this.hiddenForm='';
    console.log(this.bussine)
  }

  updateBussines(){
    console.log(this.bussine);
    this.hidden='';
    if(this.bussine.name===''||this.bussine.idSupplier===0||this.bussine.address===''||this.bussine.email===''||this.bussine.phone===''||this.bussine.nit===''){
      alert("Ningun campo puede ir vacio");
      this.hidden='hidden'
      return;
    };
    if(this.bussine.nit.toString().length>10){
      alert('El nit no puede ser mayor a 10 caracteres')
      this.hidden='hidden'
      return;
    }
    if(this.bussine.phone.toString().length>10){
      alert('El telefono no puede ser mayor a 10 caracteres')
      this.hidden='hidden'
      return;
    }
    this.bussinesServices.UpdateBussine(this.lc.get('idPerson'),this.lc.get('token'),this.bussine).
    subscribe(
      {
        next:(res:any)=>{
        if(res.column==='Token'){
          alert('Tu Session a caucado');
          this.auth.Logout(this.lc);
          return;
        }
        alert(res.msj);
        this.hidden='hidden'
      },
      error:err=>{
        this.hidden='hidden';
        alert('Ocurrio un error en el servidor, Intentelo nuevamente mas tarde')
        console.log(err)
      }
      }
    )
  }

  showForm(){
    this.hiddenForm='';
    this.edit=false;
  }
  close(){
    this.hiddenForm='hidden';
    this.getBussines();
  }
  getPage(url:string){
    this.router.navigate([url]);
  }
  ngOnInit(): void {
    this.getBussines();
  }

}
