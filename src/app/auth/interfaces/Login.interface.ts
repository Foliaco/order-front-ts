import { IPerson } from "./persona/Person.interfaces";

export interface ILogin{
log:boolean;
msj:string;
user:IUser;
token:string;
rol:string;
}
export interface IUser{
  idPerson:string;
  Person:IPerson;
  idUser:1;
  lastSession:Date;
  username:string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserSend{
  idPerson:string;
  idUser:number;
  lastSession:Date;
  password:string;
  username:string;
}
