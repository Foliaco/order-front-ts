import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/envieroment/env';
import { IHeaderDoc, IHeaderDocSend, IResponseHeaderDocument, IResponseTypeOC } from '../interfaces/Headerdocs.interface';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(
    private http:HttpClient
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

  GetDocumentByDependecies(idPerson:string,idDependecies:number,token:string,doc:string='none',dateInit:string,dateEnd:string,typeDocId:string):Observable<IResponseHeaderDocument>{
    return this.http.post<IResponseHeaderDocument>(`${environment.apiURL}document/${idPerson}/${idDependecies}/${doc}`,{
      fechaInicial:dateInit,
      fechaFinal:dateEnd,
      typeDocId:typeDocId
    },{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetDocumentById(idPerson:string,idDocument:number,token:string):Observable<IHeaderDoc>{
    return this.http.get<IHeaderDoc>(`${environment.apiURL}document-one/${idPerson}/${idDocument}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

  GetTypeDocument(idRol:string,token:string):Observable<IResponseTypeOC>{
    return this.http.get<IResponseTypeOC>(`${environment.apiURL}document-type/${idRol}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

  SetDocument(document:IHeaderDocSend,idDependecie:number,token:string,idPerson:string,idRol:string,actions:string):Observable<IResponseTypeOC>{
    ///document/:idPerson/:idDependecie/:idRol/:action
    return this.http.post<IResponseTypeOC>(`${environment.apiURL}document/${idPerson}/${idDependecie}/${idRol}/${actions}`,
    {
      document
    },
    {
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  EditDocument(document:IHeaderDocSend,idDependecie:number,token:string,idPerson:string,idRol:string,actions:string):Observable<IResponseTypeOC>{
    ///document/:idPerson/:idDependecie/:idRol/:action
    return this.http.put<IResponseTypeOC>(`${environment.apiURL}document-edit/${idPerson}/${idDependecie}/${idRol}/${actions}`,
    {
      document
    },
    {
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  ApproveDocument(idPerson:string,idRol:string,action:string,token:string,idDocument:number,idTypeDoc:string):Observable<any>{
    console.log(`${environment.apiURL}update-aprove-doc/${idPerson}/${idRol}/${action}`)
    return this.http.put<any>(`${environment.apiURL}update-aprove-doc/${idPerson}/${idRol}/${action}`,
    {
      idDocument,
      idTypeDoc
    },{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

  DenendDocument(idPerson:string,idRol:string,action:string,token:string,idDocument:number,idTypeDoc:string):Observable<any>{
    //console.log(`${environment.apiURL}update-aprove-doc/${idPerson}/${idRol}/${action}`)
    return this.http.put<any>(`${environment.apiURL}update-denend-doc/${idPerson}/${idRol}/${action}`,
    {
      idDocument,
      idTypeDoc
    },{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
}


/**
 *
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
  GetBussines(idSupplier:number,token:string):Observable<IResponseBussines>{
    return this.http.get<IResponseBussines>(`${environment.apiURL}bussines/${idSupplier}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
 */
