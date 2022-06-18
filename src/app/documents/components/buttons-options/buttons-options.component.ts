import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IHeaderDoc, ITypeDocumentOC } from '../../interfaces/Headerdocs.interface';
import { styles_doc } from '../../services/data/styles.doc';
import { DocumentProccessService } from '../../services/document-proccess.service';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-buttons-options',
  templateUrl: './buttons-options.component.html',
  styleUrls: ['./buttons-options.component.css']
})
export class ButtonsOptionsComponent implements OnInit {

  @Input() TypeDoc:ITypeDocumentOC;
  @Input() Document:IHeaderDoc;
  @Input() buttons:{name:string,color:string}[];
  RolCode:string;

  constructor(
      private lc:LocalStorageService,
      private documentProccess:DocumentProccessService,
      private documentServices:DocumentsService,
      private router:Router
    ) { }

  Approve(){
    console.log(this.Document)
  }

  async onPrint():Promise<void>{
    let doc_print=document.getElementById('content_document');
    //console.log(style_doc)
    if(doc_print===null){
       alert("No hay un documento abierto");
       return;
      }

    let ventimp = window.open(' ', 'popimpr');

    if(ventimp===null) {
      alert("No se puede abrir un documento");
      return;
    };
    ventimp.document.write(styles_doc)
    await ventimp.document.write(doc_print.innerHTML);
    ventimp.print();
    ventimp.close();
  }

  async Method(method:string){
    if(method==='Aprovar'){
      if(this.Document.status){
        alert("Un documento apliacado no puede ser modificado");
        return;
      }
      let msj=await this.documentProccess.ApproveDoc(this.Document.idDocument,this.TypeDoc,this.lc.get('rol'));
      if(msj!==''){
        alert(msj);
      }
      return;
    }
    if(method==='Anular'){
      if(this.Document.status){
        alert("Un documento apliacado no puede ser modificado");
        return;
      }
      let msj=await this.documentProccess.DenendDocument(this.Document.idDocument,this.TypeDoc,this.lc.get('rol'));
      if(msj!==''){
        alert(msj);
      }
      return;
    }
    if(method==='Modificar'){
      if(this.Document.status){
        alert("Un documento apliacado no puede ser modificado");
        return;
      }
      let check=true;

      if(this.lc.get('details')!=='') check=confirm('Tiene un documento pendiente, desea finalizarlo o continuar con este?');

      if(check===false) {
        alert('No se elimino modifico documento');
        let check_=confirm('Quiere ir a finalizarlo?');
        if(check_) {
          window.open(`document/${this.lc.get('idPerson')}`)
        };
        return;
      }

      this.lc.remove('details');
      let id=this.Document.idDocument;
      this.documentServices.GetDocumentById(this.lc.get('idPerson'),id,this.lc.get('token'))
      .subscribe({
        next:res=>{
          this.router.navigate(['document-edit',id],
          {queryParams:{'data':JSON.stringify(res)}}
          )
        },
        error:err=>{
          console.log(err)
        }
      })
    }
    if(method==='Descargar'){
      this.onPrint();
    }
  }

  ngOnInit(): void {
    console.log(this.TypeDoc)

    //this.ButtonsXUsers();
    //this.ButtonsXDocXRol();
  }

}
