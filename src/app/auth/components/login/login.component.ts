import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {ILogin} from "../../interfaces/Login.interface";
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageType } from 'src/app/shared/types/LocalStorage.type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser=new FormGroup({
    username : new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
  AttLogin:ILogin; // ? recuerda que este debe aceptar user:null
  constructor(
    private loginServices:LoginService,
    private lc:LocalStorageService,
    private router:Router
    ) { }
  Log:string='';
  Session:boolean=false;
  Msj:string="";
  getLogin(){
    this.Log='';
    this.Session=false;
    if(this.formUser.value.username===''||this.formUser.value.password===''){
      alert('No se pueden enviar campos vacios');
      return;
    }

    this.loginServices.Login(this.formUser.value.username,this.formUser.value.password)
    .subscribe({
      next:e=>{
        try{
          this.Log='active';
          if(e.log===false && e.user===null){
            this.Session=false;
            this.Msj=e.msj;
            return;
          }
          this.Session=true;
          this.AttLogin=e;
          //console.log(this.AttLogin)
          let objUser:LocalStorageType[]=[
            {key:'rol',value:this.AttLogin.rol},
            {key:'token',value:this.AttLogin.token},
            {key:'user',value:JSON.stringify(this.AttLogin.user)},
            {key:'idPerson',value:this.AttLogin.user.idPerson}
          ]
          this.lc.set(objUser);
          this.router.navigate(['main']);
        }
        catch(err){
          console.log("Error catch",err)
          this.Session=true;
          this.Msj="Error interna en la aplicacion";
          this.lc.clearAll();
          return;
        }
      },
      error:e=>{
        this.Log='active';
        this.Msj="Ocurrio un error en el servidor";
        this.Session=false;
      }
    })
  }

  ngOnInit(): void {
    // if(this.lc.get('token')!==null){
    //   this.router.navigate(['main'])
    // }
    this.loginServices.GetSession(this.lc.get('token'))
    .subscribe({
      next:res=>{
        console.log(res)
        if(res.msj==="users"){
          this.router.navigate(['main']);
        }
      },
      error:err=>{
        console.log(err)
        this.Session=true;
        this.Msj="Error interna en la aplicacion";
        this.lc.clearAll();
        return;
      }
    })
  }

}
/*




*/
