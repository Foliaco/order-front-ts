import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyText{

  private specialString=`\`}{-+´)(!//&#%((!=?°|¬><=}{¡+´´""''{.:@,}})))}`;

  simpleText(str:string):boolean{
    if(this.specialString.indexOf(str)!==-1){
      return true;
    };
    return false;
  }
}
