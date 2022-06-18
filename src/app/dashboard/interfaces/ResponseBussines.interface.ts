import { IStations } from "src/app/auth/interfaces/bussines/Bussines.interfaces";

export type IResponseBussines={
  data:[{
    idBussine: number;
    name:string;
    address:string;
    email:string;
    phone:string;
    nit:string;
    createdAt?:Date;
    updatedAt?:Date;
    idSupplier: number;
  }],
  msj:string;
  column:string;
}
export type BussinesResponse={
  idBussine: number;
  Stations:IStations[];
  name:string;
  address:string;
  email:string;
  phone:string;
  nit:string;
  createdAt?:Date;
  updatedAt?:Date;
  idSupplier: number;
}
export type IResponseBussinesStation={
  data:BussinesResponse[],
  msj:string,
  column:string
}
