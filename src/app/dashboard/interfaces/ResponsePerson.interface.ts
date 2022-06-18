import { IPerson } from "src/app/auth/interfaces/persona/Person.interfaces"

export type IResponsePerson={
  data:IPerson;
  msj:string;
  column:string;
}
export type IResponsePersonArray={
  data:IPerson[];
  msj:string;
  column:string;
}
