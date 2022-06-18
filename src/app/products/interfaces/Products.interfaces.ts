export type IProduct={
  idProduct:number;
  name:string;
  description:string;
  _references:string;
  code:string;
  marca:string;
  subValue:number|string; //total bruto
  iva:number|string;
  value:number|string;
  status:boolean;
  createdAt:Date;
  updatedAt:Date;
  count:number;
}
export type IProductMaster={
  idProduct:number;
  name:string;
  description:string;
  _references:string;
  code:string;
  Marca:IMarca;
  subValue:number|string; //total bruto
  iva:number|string;
  value:number|string;
  status:boolean;
  createdAt:Date;
  updatedAt:Date;
}
export type IMarca={
  idMarca:number;
  name:string;
  createdAt:Date;
  updatedAt:Date;
}
