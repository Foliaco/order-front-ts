import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { IProduct } from 'src/app/products/interfaces/Products.interfaces';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IHeaderDoc, ITypeDocumentOC } from '../../interfaces/Headerdocs.interface';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-filter-docs',
  templateUrl: './filter-docs.component.html',
  styleUrls: ['./filter-docs.component.css']
})
export class FilterDocsComponent implements OnInit {


  Document_id:string;
  TypeDoc:string;
  HeaderDocs:IHeaderDoc[];
  DocumentSelect:IHeaderDoc;
  buttons:{name:string,color:string}[]=[];
  constructor(
    private document: DocumentsService,
    private lc:LocalStorageService,
    private activeRouter:ActivatedRoute,
    private router:Router,
    private person:LoginService
  ) { }

  setDocuments(){
    let idPerson:string=this.lc.get('idPerson')||'';
    let idDependecie=this.activeRouter.snapshot.params['id'];
    let token=this.lc.get('token')||'';
    this.document.GetDocumentByDependecies(idPerson,idDependecie,token)
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          alert("Su session a caucado");
          this.router.navigate(['']);
          return;
        }
        console.log(res.data);
        this.HeaderDocs=res.data;
      },
      error:err=>{
        console.log("Error ",err);
        alert("Error en el servicio")
      }
    })
  }

  selectDocument(event:Event,document:IHeaderDoc){
    //console.log(document)
    let temp=this.HeaderDocs.find(e=>e.idDocument===document.idDocument);

    if(temp===undefined){
      alert("Error en la seleccion");
      return;
    }
    this.DocumentSelect=temp;
    this.ButtonsXDocXUser(document.TypeDocumentsCO);
  }

  ButtonsXDocXUser(TypeDoc:ITypeDocumentOC){
    let rolCode=this.lc.get('rolCode');

    if(TypeDoc.code==='SOLID' || TypeDoc.code==='OCD'){
      this.buttons=[
      ]
      return;
    }

    if(TypeDoc.code==='SOLA' || rolCode==='USER SOL'){
      this.buttons=[
      //{name:"Anular",color:"danger"},//* Solo podras anular tus propios documento que han
      {name:"Descargar",color:"green"}, //* Descargar en un pdf un documento
      {name:"Modificar",color:"edit"} //* la unica forma de modificar es quien lo haga es el administrador
      ]
      return;
    }
    if(TypeDoc.code==='SOLI' && rolCode!=='USER SOL'){
      this.buttons=[
        {name:"Aprovar",color:"green"},
        {name:"Anular",color:"danger"},
        {name:"Descargar",color:"green"},
        {name:"Modificar",color:"edit"},
        //{name:"Aceptar",color:"green"}
      ]
      return;
    }
    if(TypeDoc.code==='OCA' || rolCode==='ADMIN GOD' || rolCode==='ADMIN SUPPLIER' || rolCode==='ADMIN APP'){
      this.buttons=[
        {name:"Anular",color:"danger"},
        {name:"Descargar",color:"green"},
        {name:"Modificar",color:"edit"},
        //{name:"Aceptar",color:"green"}
      ]
      return;
    }
    if(TypeDoc.code==='OC' && ( rolCode!=='USER SOL' && rolCode!=='USER OC')){ //! REOLVER LOS BOTONES PARA ADMIN SOL
      this.buttons=[
        {name:"Anular",color:"danger"},
        {name:"Descargar",color:"green"},
        {name:"Modificar",color:"edit"},
        {name:"Aprovar",color:"green"}
      ]
      return;
    }
  }

  ngOnInit(): void {

    this.person.GetSession(this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        if(res.user==="users"){
          return;
        }
      },
      error:err=>{
        if(err.column==='Token'){
          alert("Su session a caucado")
          this.router.navigate(['']);
          return;
        }
        console.log("Error ",err);
        alert("Error en el servicio")
      }
    })

    this.setDocuments();
  }

}
