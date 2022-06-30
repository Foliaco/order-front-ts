import _ from "lodash";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, IProductMaster } from 'src/app/products/interfaces/Products.interfaces';
import { ProductsService } from 'src/app/products/services/products.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IDetailsDocModel, IHeaderDoc, IHeaderDocSend, ITypeDocumentOC } from '../../interfaces/Headerdocs.interface';
import { DocumentsService } from '../../services/documents.service';
import { BussinesService } from "src/app/dashboard/services/bussines/bussines.service";
import { IBussines, IDependecies, IStations, ISuppliers } from "src/app/auth/interfaces/bussines/Bussines.interfaces";
import { LoginService } from "src/app/auth/services/login.service";

@Component({
  selector: 'app-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.css']
})
export class FormDocumentComponent implements OnInit {
  sede_name: string;
//! recuerda limitar la creacion de documento mediante los actions - doc-sol,guardar para solicitudes y doc-oc para usar las anteriores y ordenes de compras
@ViewChild('sede_select') sede_select:ElementRef;
@ViewChild('dependecies_select') dependecies_select:ElementRef;
@ViewChild('typedoc_select') typedoc_select:ElementRef;
@ViewChild('typedoc_select_edit') typedoc_select_edit:ElementRef;

observacion:string;
typeDOcs:ITypeDocumentOC[];
products:IProductMaster[];
detailsProduct:IProduct[]=[];
dependeciesDoc:IDependecies[]=[];
stationDoc:IStations[]=[];
name:string;
visable:boolean = false;
show:boolean;
totalIva:number=0;
value:number=0;
subValue=0;
selectedProduct:IProduct={
  marca:'',
  name:'',
  _references:'',
  code:'',
  createdAt:new Date,
  description:'',
  idProduct:0,
  iva:0,
  value:0,
  subValue:0,
  status:false,
  updatedAt:new Date,
  count:1
};
rol=this.lc.get('rol');
edit:boolean=false;
station_edit:IStations;
station_name:string;
sede_edit:IDependecies;
bussine_edit:number;
typDoc_edit:ITypeDocumentOC={
  name: '', idTypeDocumentOC: '', code: '', createdAt: new Date(),
  idBussine: {
    idBussine: 0,
    name: "",
    address: "",
    email: "",
    phone: "",
    nit: "",
    createdAt: undefined,
    updatedAt: undefined,
    idSupplier: 0
  },
  updatedAt:new Date()
};
supplier_edit:ISuppliers;
idDocument_edit:number;
parse=parseInt;
  constructor(
    private lc:LocalStorageService,
    private serviceDocument:DocumentsService,
    private productService:ProductsService,
    private servicesbussines:BussinesService,
    //private router:Router,
    private routerActive:ActivatedRoute,
    private auth:LoginService
  ) { }

  saveObservacion(event:any){
    this.lc.set([{key:"observacion",value:event.target.value}])
  }

  close(bol:any): void{
    this.visable=bol;
  }

  searchProduct(){
    if(this.name===undefined || this.name.trim()===""){
      alert("Debe ingresar un texto");
      return;
    }

    this.visable=true;
    this.productService.GetSearchProduct(this.name||'',this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
          this.products=res.data;
          this.visable=true;
      },
      error:err=>{
        alert("Error en el servidor por favor intentelo mas tarde");
        console.log(err);
        return;
      }
    })
  }

  fillProduct(product:IProduct){
    console.log(product);
    this.selectedProduct=product;
    this.selectedProduct.count=1;
    // this.totalIva+=parseInt(product.iva.toString());
    // this.subValue+=parseInt(product.subValue.toString());
    // this.value+=parseInt(product.value.toString());
  }

  setProductInDetail(){
    if(this.selectedProduct.count<1){
      alert("La cantidad minima es de 1");
      return;
    }
    if(this.selectedProduct.name.trim()===""){
      alert("La cantidad minima es de 1");
      return;
    }
    let index=this.detailsProduct.findIndex(e=>e.idProduct===this.selectedProduct.idProduct);
    if(index!=-1&&this.selectedProduct.code!=='OTROS'){
      alert("El producto "+this.selectedProduct.name+" ya esta agregado");
      return;
    }

    console.log(this.selectedProduct);

    if(this.selectedProduct.value==0){
      alert("El precio con iva no puede ser igual a 0");
      return;
    }

    this.detailsProduct.push(this.selectedProduct)

    this.lc.set([{key:"details",value:JSON.stringify(this.detailsProduct)}])
    this.totalIva+=parseInt(this.selectedProduct.iva.toString())*this.selectedProduct.count;
    this.subValue+=parseInt(this.selectedProduct.subValue.toString())*this.selectedProduct.count;
    this.value+=parseInt(this.selectedProduct.value.toString())*this.selectedProduct.count;

    this.selectedProduct={
      marca:'',
      name:'',
      _references:'',
      code:'',
      createdAt:new Date,
      description:'',
      idProduct:0,
      iva:0,
      value:0,
      subValue:0,
      status:false,
      updatedAt:new Date,
      count:1
    };
  }

  async verifyMode(){

    if(this.routerActive.snapshot.queryParams['data']===undefined) return;
    this.edit=true;
    let data:IHeaderDoc=JSON.parse(await this.routerActive.snapshot.queryParams['data']).data
    this.detailsProduct=JSON.parse(data.DetailsDocs[0].DetailsDocModel);
    this.observacion=data.observacion;
    this.station_edit=data.Station;
    this.station_name=this.station_edit.name;
    this.sede_edit=data.Dependecy;
    this.sede_name=this.sede_edit.name;
    this.typDoc_edit=data.TypeDocumentsCO;
    this.supplier_edit=data.idSupplier;
    this.idDocument_edit=data.idDocument;
    this.calc();
    if(typeof(data.idBussine)==='number'){
      this.bussine_edit=data.idBussine;
    }
    if(typeof(data.idSupplier)==='number'){
      this.supplier_edit=data.idSupplier;
    }
  }

  getTypeDoc(){
    let idRol=this.lc.get('idRol')||'';
    let token=this.lc.get('token')||'';

    this.serviceDocument.GetTypeDocument(idRol,token)
    .subscribe(
      {
        next:res=>{
          if(res.column==='Token'){
            this.auth.Logout(this.lc);
            return;
          }
          this.typeDOcs=res.data;
          console.log(this.typeDOcs)
        },
        error:err=>{
          alert("Error en el servidor")
          console.log(err)
          return;
        }
      }
    )
  }

  getStationByIdUser(){
    this.servicesbussines.GetStationByIdPerson(parseInt(this.lc.get('idBussine')||'0'),this.lc.get('idPerson'),this.lc.get('token'))
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        this.stationDoc=res.data;
        this.getDependeciesByIdUser(undefined,res.data[0].idStation);
      },
      error:err=>{
        alert("A ocurrido un error en el servidor");
        console.log(err);
      }
    })
  }

  getDependeciesByIdUser(event?:any,_id?:number){
    let id=_id||event.target.value;
    this.servicesbussines.GetDependeciesByIdPerson(id,this.lc.get('idPerson')||'',this.lc.get('token')||'')
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        this.dependeciesDoc=res.data;
      },
      error:err=>{
        alert("A ocurrido un error en el servidor");
        console.log(err);
      }
    })
  }
  editProduct(product:IProduct){
    let index=this.detailsProduct.findIndex(e=>e.idProduct==product.idProduct);
    this.detailsProduct.splice(index,1);
    this.selectedProduct=product;
    this.totalIva-=parseInt(product.iva.toString())*parseInt(product.count.toString());
    this.subValue-=parseInt(product.subValue.toString())*parseInt(product.count.toString());
    this.value-=parseInt(product.value.toString())*parseInt(product.count.toString());
  }

  deleteProduct(product:IProduct){
    let index=this.detailsProduct.findIndex(e=>e.idProduct==product.idProduct);
    this.detailsProduct.splice(index,1);
    this.lc.set([{key:"details",value:JSON.stringify(this.detailsProduct)}])

    this.totalIva-=parseInt(product.iva.toString())*parseInt(product.count.toString());
    this.subValue-=parseInt(product.subValue.toString())*parseInt(product.count.toString());
    this.value-=parseInt(product.value.toString())*parseInt(product.count.toString());
  }

  clearProduct(all:boolean){
    if(all===false){
      this.selectedProduct={
        marca:'',
        name:'',
        _references:'',
        code:'',
        createdAt:new Date,
        description:'',
        idProduct:0,
        iva:0,
        value:0,
        subValue:0,
        status:false,
        updatedAt:new Date,
        count:1
      };
    }
    else{
      this.detailsProduct=[];
      this.lc.set([{key:"details",value:"[]"}])
      this.value=0;
      this.subValue=0;
      this.totalIva=0;
    }
  }

  verifyData(){
    let str=this.lc.get('details');
    if(str==='') return;
    let data=JSON.parse(str);
    this.detailsProduct=data;
  }

  calc(){
    let detail=this.detailsProduct;
    detail.forEach(e=>{
        this.totalIva+=parseInt(e.iva.toString())===0?1:parseInt(e.iva.toString())*e.count;
        this.subValue+=parseInt(e.subValue.toString())===0?1:parseInt(e.subValue.toString())*e.count;
        this.value+=parseInt(e.value.toString())*e.count;
    })
  }

  sendDocument(){
    let idStation=parseInt(this.sede_select.nativeElement.value);
    let idBussine=parseInt(this.dependecies_select.nativeElement.value);
    let idTypeDocumentOC:string=this.typedoc_select.nativeElement.value
    let idSupplier=parseInt(this.lc.get('idSupplier')||'0');
    let idUser=JSON.parse(this.lc.get('user')||'').idUser;
    let rol=this.lc.get('idRol')||'';
    let subValue=this.subValue;
    let value=this.value;
    let iva=this.totalIva;
    let detailsDoc=this.detailsProduct;
    let codeType=this.typeDOcs.filter(e=>e.idTypeDocumentOC===e.idTypeDocumentOC);

    if(codeType===null) {
      alert("No se encontro el documento")
      return;
    }

    console.log(idTypeDocumentOC);
    if(detailsDoc.length===0){
      alert("EL documento no puede ir vacio")
      return;
    }//? arreglar la entidad de detailDocModel[]
    this.serviceDocument.SetDocument({
      detailsDoc:{
        DetailsDocModel:this.detailsProduct
      },
      idBussine,
      idStation,
      idUser,
      rol,
      value,
      subValue,
      iva,
      idSupplier,
      idTypeDocumentOC,
      observacion:this.observacion
    },this.dependecies_select.nativeElement.value,this.lc.get('token')||'',this.lc.get('idPerson')||'',rol||'',`DOC-${codeType[0].code}`)
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        console.log(res);
        alert(res.msj);
        this.clearProduct(true);
        return;
      },
      error:err=>{
        console.log(err);
        alert("Error en el servicio, por favor intente mas tarde")
      }
    })
  }

  editDocument(){

    let idStation=this.sede_edit.idStation;
    let idBussine=this.bussine_edit;
    let idTypeDocumentOC:string=this.typDoc_edit.idTypeDocumentOC;
    let idSupplier=typeof(this.supplier_edit)==='number'?this.supplier_edit:0;
    let idUser=JSON.parse(this.lc.get('user')||'').idUser;
    let rol=this.lc.get('idRol')||'';
    let subValue=this.subValue;
    let value=this.value;
    let iva=this.totalIva;
    let detailsDoc=this.detailsProduct;
    if(detailsDoc.length===0){
      alert("EL documento no puede ir vacio")
      return;
    }

    let codeType=this.typeDOcs.filter(e=>e.idTypeDocumentOC===idTypeDocumentOC);
    if(codeType===null) {
      alert("No se encontro el documento")
      return;
    }
    console.log(codeType)
    this.serviceDocument.EditDocument({
      detailsDoc:{
        DetailsDocModel:this.detailsProduct
      },
      idDocument:this.idDocument_edit,
      idBussine,
      idStation,
      idUser,
      rol,
      value,
      subValue,
      iva,
      idSupplier,
      idTypeDocumentOC,
      observacion:this.observacion
    },this.sede_edit.idDependecie,this.lc.get('token')||'',this.lc.get('idPerson')||'',rol||'',`DOC-${this.typDoc_edit.code}`)
    .subscribe({
      next:res=>{
        if(res.column==='Token'){
          this.auth.Logout(this.lc);
          return;
        }
        console.log(res);
        alert(res.msj);
        this.clearProduct(true);
        return;
      },
      error:err=>{
        console.log(err);
        alert("Error en el servicio, por favor intente mas tarde")
      }
    })
  }
  selectedType(event:Event){
    if(this.edit){
      this.typDoc_edit.idTypeDocumentOC=this.typedoc_select_edit.nativeElement.value
    }
  }
  ngOnInit(): void {
    this.getTypeDoc(); //? Responde con los tipos de documento que tiene acceso el usuario
    this.verifyData();  //?recupera los datos de un documento si se reincia el naveador
    this.getStationByIdUser();  //?responde las sedes que tiene acceso ese usuario
    this.verifyMode();
    this.calc();

  }

}
