import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IHeaderDoc, ITypeDocumentOC } from '../../interfaces/Headerdocs.interface';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-filter-docs',
  templateUrl: './filter-docs.component.html',
  styleUrls: ['./filter-docs.component.css']
})
export class FilterDocsComponent implements OnInit {

  date:Date=new Date();
  dateInput:{dateInit:string,dateEnd:string}={dateInit:`${this.date.getFullYear()}-${this.date.getMonth()}-01`,dateEnd:`${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`}
  Document_id:string;
  _dateFilter:{initialDate:string,endDate:string}={
    initialDate:new Date(Date.UTC(this.date.getFullYear(),this.date.getMonth(),1,0,0)).toISOString(),
    endDate:new Date(Date.UTC(this.date.getFullYear(),this.date.getMonth(),this.date.getDate(),23,59)).toISOString()
  };
  TypeDoc:string='TODO';
  HeaderDocs:IHeaderDoc[];
  typeDocs:ITypeDocumentOC[];
  DocumentSelect:IHeaderDoc;
  buttons:{name:string,color:string}[]=[];
  hidden:string='hidden';
  constructor(
    private document: DocumentsService,
    private lc:LocalStorageService,
    private activeRouter:ActivatedRoute,
    private router:Router,
    private person:LoginService,
  ) { }

  setDateInit(event:any){
    let d=event.target.value.split('-');
    this._dateFilter.initialDate=new Date(new Date(Date.UTC(d[0],d[1]-1,d[2],0,0))).toISOString();
  }
  setDateEnd(event:any){
    let d=event.target.value.split('-');
    this._dateFilter.endDate=new Date(Date.UTC(d[0],d[1]-1,d[2],23,59,59,999)).toISOString();
  }

  setDocuments(buscar:string='none'){
    this.hidden='';
    let idPerson:string=this.lc.get('idPerson')||'';
    let idDependecie=this.activeRouter.snapshot.params['id'];
    let token=this.lc.get('token')||'';
    this.document.GetDocumentByDependecies(idPerson,idDependecie,token,buscar==''?'none':buscar,this._dateFilter.initialDate,this._dateFilter.endDate,this.TypeDoc)
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          alert("Su session a caucado");
          this.router.navigate(['']);
          return;
        }
        console.log(res.data);
        this.HeaderDocs=res.data;
        this.hidden='hidden';
      },
      error:err=>{
        console.log("Error ",err);
        alert("Error en el servicio, por favor intente mas tarde")
      }
    })
  }

  enter(event:KeyboardEvent){
    if(event.key=='Enter'){
      this.setDocuments(this.Document_id);
    }
  }

  filter(event:any){
    let id=event.target.value;
    console.log(id)
  }

  getTypeDoc(){
    this.document.GetTypeDocument(this.lc.get('idRol'),this.lc.get('token'))
    .subscribe(
      {
        next:res=>{
          if(res.column==='Token'){
            this.person.Logout(this.lc);
            return;
          }
          this.typeDocs=res.data;
        },
        error:err=>{
          console.log(err);
          alert('Intentelo mas tarde o consulte con la persona encargada');
        }
      },
    )
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
    console.log(Date.UTC(this.date.getFullYear(),this.date.getMonth()+1,this.date.getDay(),0,0))
    console.log(new Date(Date.UTC(this.date.getFullYear(),this.date.getMonth()+1,this.date.getDay(),0,0)).toISOString())

    this.hidden='';
    this.getTypeDoc();
    this.person.GetSession(this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        this.hidden='hidden';
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
        alert("Error en el servicio, por favor intente mas tarde")
      }
    })

    this.setDocuments();
  }

}
