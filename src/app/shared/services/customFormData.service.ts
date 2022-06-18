import { Injectable } from '@angular/core';
import { FormDataTypes } from '../types/FormDataType.type';
import { LocalStorageType } from '../types/LocalStorage.type';

@Injectable({
  providedIn: 'root'
})
export class CustomFormData {

  constructor(
    protected form:FormData
  ) { }

  set<T>(data:T[]){
      // let _data:T[];
      // data.forEach(e=>{
      //   this.form.append()
      // })
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
