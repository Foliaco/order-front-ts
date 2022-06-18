import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStations } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { BussinesService } from '../../services/bussines/bussines.service';

@Component({
  selector: 'app-main-grid-station',
  templateUrl: './main-grid-station.component.html',
  styleUrls: ['./main-grid-station.component.css']
})
export class MainGridStationComponent implements OnInit {

  constructor(
    private router:Router,
    private lc:LocalStorageService,
    private activeRoute: ActivatedRoute,
    private bussines:BussinesService,
    private auth:LoginService
  ) { }

  stations:IStations[]=[];

  fillStation(){
    let idBussine:number=this.activeRoute.snapshot.params['id']
    this.bussines.GetStations(idBussine,this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        this.stations=res.data
        console.log(this.stations)
      },
      error:err=>{
        if(err.msj===undefined){
          alert("Error en conexion a servidor...");
          return;
        }
        if(err.column==='Token'){
          alert("Session caucada");
          this.auth.Logout(this.lc);
        }
      }
    })
  }

  getPage(url:string,id:number){
    this.router.navigate([url,id])
  }

  ngOnInit(): void {
    this.fillStation();
  }

}
