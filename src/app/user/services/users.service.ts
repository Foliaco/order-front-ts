import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IPersonSend, ITypeDocument, RequestTypeDocument, ResponseRols } from 'src/app/auth/interfaces/persona/Person.interfaces';
import { IResponseBussines } from 'src/app/dashboard/interfaces/ResponseBussines.interface';
import { IResponsePersonArray } from 'src/app/dashboard/interfaces/ResponsePerson.interface';
import { environment } from 'src/app/envieroment/env';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private lc: LocalStorageService
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error
        );
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getTypeDocument(idPerson:string):Observable<RequestTypeDocument>{
    //console.log(environment.apiURL+`type-document/${idPerson}`)
    return this.http.get<RequestTypeDocument>(environment.apiURL+`type-document/${idPerson}`,{
      headers:{
        'x-access':this.lc.get('token')
      }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  GetStationByIdPerson(idBussine:number,idPerson:string,token:string,action:string='DOC'):Observable<IResponseBussines>{
    return this.http.post<IResponseBussines>(`${environment.apiURL}person-station`,{idPerson,idBussine,options:action},{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

  GetRolXIdPerson(idPerson:string,token:string):Observable<ResponseRols>{
    return this.http.get<ResponseRols>(`${environment.apiURL}get-rol/${idPerson}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }


  SetPersonEdit(idPerson:string,token:string,person:IPersonSend,_idPerson:string):Observable<any>{
    return this.http.put<ResponseRols>(`${environment.apiURL}/edit-person/${idPerson}`,{
      person,
      edit:true,
      idPersonEdit:_idPerson
    },{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

  SetPerson(idPerson:string,token:string,person:IPersonSend,_idPerson?:string):Observable<any>{
    return this.http.post<ResponseRols>(`${environment.apiURL}/person/${idPerson}`,{
      person
    },{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

  UpdatePassword(token:string,idPerson:string,pass:string):Observable<any>{
    return this.http.put(`${environment.apiURL}change-password/${idPerson}`,{pass},{
      headers:{'x-access':token}
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  GetPerson(token:string,name:string,search:string,idPerson:string):Observable<IResponsePersonArray>{
    console.log("one person")
    return this.http.get<IResponsePersonArray>(`${environment.apiURL}person/${name}/${search}/${idPerson}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

}
