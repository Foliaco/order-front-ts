export type IResponseStation={
  data:[{
    idStation:number;
    idBussine: number;
    name:string;
    address:string;
    email:string;
    phone:string;
    nit:string;
    createdAt:Date;
    updatedAt:Date;
  }];
  msj:string;
  column:string;
}
