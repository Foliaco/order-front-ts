import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { MenusService } from '../../services/menus/menus.service';

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css']
})
export class BarMenuComponent implements OnInit {

  nombre:string='';
  rol:string='';
  constructor(
    private Menus: MenusService,
    private Lc:LocalStorageService,
    private route:Router
  ) { }

  nav:any[];

  getPage(url:string){
    this.route.navigate([url])
  }

  exit(){
    this.Lc.clearAll();
    alert('Ha cerrado sesion exitozamente');
    this.route.navigate(['']);
    return;
  }

  ngOnInit(): void {
    this.rol=this.Lc.get('rol');
    this.nombre=this.Lc.get('names').toUpperCase()+' '+this.Lc.get('lastnames').toUpperCase();
    if(this.rol=='') {
      this.exit();
    };

    let menus=this.Menus.getMenu(this.rol)
    if(menus===undefined) return;
    this.nav=menus.navs



  }

}
