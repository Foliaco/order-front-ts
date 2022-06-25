import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ITypeDocumentOC } from '../interfaces/Headerdocs.interface';
import rols from "../services/data/rols.json";
import { DocumentsService } from './documents.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentProccessService {

  constructor(
    private lc:LocalStorageService,
    private documentServices:DocumentsService,
    private auth:LoginService
  ) { }

  async DenendDocument(idDocument: number,typeDoc:ITypeDocumentOC,rol:string): Promise<string>{

    let index=rols.findIndex(e=>e.name===rol);
    console.log(index)
    if(index===-1) return "Lo siento pero no tienes permiso para esto - err:1"; //? busca en el archivo rols si tiene los permisos o roles necesarios

    if(typeDoc.code ==='SOLD' ) return "no puedes anular un documento que ya se ha anulado";
    if(typeDoc.code ==='SOLA') return "No puedes anular un documento que ya esta aprovado";

    let check=confirm("Seguro que quieres anular el documento?\n esta accion no se puede revertir");
    if(!check) return "No se anulo ningun documento";

    switch(typeDoc.code){
      case 'SOLI':
        this.documentServices.DenendDocument(this.lc.get('idPerson'),this.lc.get('idRol'),`DOC-SOLID`,this.lc.get('token'),idDocument,'SOLID')//? en cada caso especifique el documento
        .subscribe(
          {
            next:res=>{
              if(res.column==='Token'){
                alert("Session caucada")
                this.auth.Logout(this.lc)
              }
              console.log(res);
              alert(res.msj);
              return;
            },
            error:err=>{
              console.log(err);
              alert("Error en el servicio, por favor intente mas tarde");
            }
          }
        )
        return "";
      case 'OC':
        this.documentServices.DenendDocument(this.lc.get('idPerson'),this.lc.get('idRol'),`DOC-OCD`,this.lc.get('token'),idDocument,'OCD')//? en cada caso especifique el documento
        .subscribe(
          {
            next:res=>{
              if(res.column==='Token'){
                alert("Session caucada")
                this.auth.Logout(this.lc)
              }
              console.log(res);
              alert(res.msj);
            },
            error:err=>{
              console.log(err);
              alert("Error en el servicio, por favor intente mas tarde")
            }
          }
        )
        return "";
        default:
        return "No existe un tipo de documento anulacion para este";
    }

  }

  async ApproveDoc(idDocument:number,typeDoc:ITypeDocumentOC,rol:string):Promise<string>{
    let check=confirm(`Seguro desear aprovar la ${typeDoc.name}?`);
    if(!check)return "No se aprobo el documento";
    let index=rols.findIndex(e=>e.name===rol);


    switch(typeDoc.code){
      case 'SOLI':
        console.log(index)

        if(index===-1) return "Lo siento pero no tienes permiso para esto - err:1";
        if(typeDoc.code==='SOLI' && rol==='USER SOL') return "lo siento pero solo los jefes de compras puede aprovar las solicitudes";

        this.documentServices.ApproveDocument(this.lc.get('idPerson'),this.lc.get('idRol'),`DOC-SOLA`,this.lc.get('token'),idDocument,'SOLA')
        .subscribe(
          {
            next:res=>{
              if(res.column==='Token'){
                alert("Session caucada")
                this.auth.Logout(this.lc)
              }
              console.log(res);
              alert(res.msj);
              return;
            },
            error:err=>{
              console.log(err);
              alert("Error en el servicio, por favor intente mas tarde")
            }
          }
        )
        return "";

      case 'OC':
        console.log(index)
        if(index===-1) return "Lo siento pero no tienes permiso para esto - err:1";
        if(rol==='USER SOL') return "lo siento pero solo los jefes de compras puede aprovar las solicitudes";

        this.documentServices.ApproveDocument(this.lc.get('idPerson'),this.lc.get('idRol'),`DOC-OCA`,this.lc.get('token'),idDocument,'OCA')
        .subscribe(
          {
            next:res=>{
              if(res.column==='Token'){
                alert("Session caucada")
                this.auth.Logout(this.lc)
              }
              console.log(res);
              alert(res.msj);
              return;
            },
            error:err=>{
              console.log(err);
              alert("Error en el servicio, por favor intente mas tarde")
            }
          }
        )
        return "";

        default:
          console.log("switch --- aprove doc")
        return "No tiene permiso para este documento";
      }

  }
}
