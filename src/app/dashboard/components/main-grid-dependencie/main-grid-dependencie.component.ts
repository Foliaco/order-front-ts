import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDependecies } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { BussinesService } from '../../services/bussines/bussines.service';

@Component({
  selector: 'app-main-grid-dependencie',
  templateUrl: './main-grid-dependencie.component.html',
  styleUrls: ['./main-grid-dependencie.component.css']
})
export class MainGridDependencieComponent implements OnInit {

  constructor(
    private activeRoute:ActivatedRoute,
    private bussines:BussinesService,
    private lc:LocalStorageService,
    private auth:LoginService,
    private router:Router
  ) { }

  @Input() dependencies:IDependecies[]=[];

  fillDependencies(){
    let idBussine:number=this.activeRoute.snapshot.params['id']
    this.bussines.GetDependencies(idBussine,this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        this.dependencies=res.data;
        console.log(res)
      },
      error:err=>{
        if(err.msj===undefined){
          alert("Error en conexion a servidor...");
          return;
        }
        if(err.column==='Token'){
          alert("Session caucada");
          this.auth.Logout(this.lc)
        }
      }
    })
  }

  getPage(url:string,id:number){
    this.router.navigate([url,id])
  }

  ngOnInit(): void {
    this.fillDependencies();
  }

}
