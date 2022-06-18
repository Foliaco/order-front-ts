import { IBussines, IDependecies, IStations, ISuppliers } from "src/app/auth/interfaces/bussines/Bussines.interfaces";
import { IUser } from "src/app/auth/interfaces/Login.interface";
import { IProduct } from "../../products/interfaces/Products.interfaces";

export type IHeaderDoc={
  idDocument:number;
  DetailsDocs:IDetailsDoc[];
  idBussine:IBussines;
  Station:IStations;
  Dependecy:IDependecies;
  TypeDocumentsCO:ITypeDocumentOC;
  idSupplier:ISuppliers;//proveedor
  user:IUser;
  count:number;
  subValue:number; //total bruto
  iva:number;
  value:number;//total bruto + iva
  createdAt:Date;
  updatedAt:Date;
  observacion:string;
  status:boolean;
} // ? crear un IHeaderDoc para enviar
export type IHeaderDocSend={
  idDocument?:number;
  detailsDoc:IDetailsDocSend;
  idBussine:number;
  idStation:number;
  idTypeDocumentOC:string;
  rol:string;
  idSupplier:number;//proveedor
  idUser:number;
  count?:number;
  subValue:number; //total bruto
  iva:number;
  value:number;//total bruto + iva
  createdAt?:Date;
  updatedAt?:Date;
  observacion:string;
}
export type IResponseHeaderDocument={
  data:IHeaderDoc[];
  msj:string;
  column:string;
}

export type ITypeDocumentOC={
  idTypeDocumentOC:string;
  idBussine:IBussines;
  name:string;
  code:string;
  createdAt:Date;
  updatedAt:Date;
}

export type IResponseTypeOC={
  data:ITypeDocumentOC[],
  msj:string;
  column:string;
}

export type IDetailsDoc={
  DetailsDocModel:string;
  createdAt:Date;
  idDetailsDocument:number;
  idDocument:number;
  observacion:string;
  updatedAt:Date;
}
export type IDetailsDocSend={
  DetailsDocModel:IProduct[];//array de productos
  createdAt?:Date;
  idDetailsDocument?:number;
  idDocument?:number;
  updatedAt?:Date;
}

export type IDetailsDocModel={
  idProduct:IProduct;
  name:string;
  code:string;
  _references:string;
  description:string;
  marca:string;
  count:number;
  subValue:number|string; //total bruto
  iva:number|string;
  value:number|string;//total bruto + iva
  status:boolean;
  createdAt:Date;
  updatedAt:Date;
}
