import { Injectable } from '@angular/core';
import { LocalStorageType } from '../types/LocalStorage.type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(data:LocalStorageType[]){
    data.forEach((e:LocalStorageType)=>{

      localStorage.setItem(e.key,e.value.toString());

    });
  }
  get(key:string):string{
    let data=localStorage.getItem(key);
    if(data===null) return '';
    return  data;
  }
  remove(key:string):void{
    localStorage.removeItem(key);
  }
  clearAll():void{
    localStorage.clear();
  }
}
