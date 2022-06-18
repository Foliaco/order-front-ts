import { Injectable } from '@angular/core';
import nav from "../../../../assets/json/nav.json";
@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private navs=nav;
  constructor() { }

  getMenu(rols:string){
  return this.navs.find(e=>e.rol===rols)
  }
}
