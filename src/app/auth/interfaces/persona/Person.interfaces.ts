import { IBussines, IDependecies, IStations, ISuppliers } from "../bussines/Bussines.interfaces"
import { IUser } from "../Login.interface"

export type IPerson={
  idPerson:string;
  names: string;
  lastnames: string;
  document: string;
  email: string;
  phone: string;
  createdAt:Date;
  updatedAt: Date;
  idBussine: number;
  idStation: number;
  idTypeDocument:string;
  idRol:string;
  idSupplier: number;
  idDependecie: number;
  user:IUser;
  TypeDocument:ITypeDocument;
  Rol:IRols;
  Supplier:ISuppliers;
  Station:IStations;
  Bussine:IBussines;
  Dependecy:IDependecies;
  status:boolean;
}

export type IPersonSend={
  names: string;
  lastnames: string;
  document: string;
  email: string;
  phone: string;
  idBussine: number;
  idStation: number;
  idTypeDocument:string;
  rol:string;
  username:string;
  password:string;
  idSupplier: number;
  idDependecie: number;
  status:boolean;
}
export type ITypeDocument={
    idTypeDocument:string;
    name:string;
    code:string;
    createdAt?:Date;
    updatedAt?:Date;

}
export type RequestTypeDocument={
  msj:string;
  column:string;
  err:string;
  data:ITypeDocument[];
}
export type ResponseRols={
  data:IRols[];
  msj:string;
  column:string;
  err:string;
}
export type IRols={
  idRol:string;
  idsActions:string;
  name:string;
  description:string;
  detalle:string;
  createdAt?:Date;
  updatedAt?:Date;
}
