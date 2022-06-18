export type IBussines={
    idBussine: number,
    name:string;
    address:string;
    email:string;
    phone:string;
    nit:string;
    createdAt?:Date;
    updatedAt?:Date;
    idSupplier: number;

}
export type IStations={
  idStation: number;
  name:string;
  address:string;
  email:string;
  phone: string,
  nit:string;
  createdAt:Date;
  updatedAt:Date;
  idBussine: number;
}
export type ISuppliers={
  idSupplier: number,
  name:string;
  address:string;
  email:string;
  phone:string;
  nit:string;
  typeLincense:string;
  createdAt?:string;
  updatedAt?:string;
}
export type IDependecies={
  idDependecie:number;
  idStation:number;
  name:string;
  createdAt:Date;
  updatedAt:Date;
}
