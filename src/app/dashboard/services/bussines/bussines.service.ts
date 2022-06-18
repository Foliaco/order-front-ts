import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IPerson } from 'src/app/auth/interfaces/persona/Person.interfaces';
import { environment } from 'src/environments/environment';
import { IResponseBussines, IResponseBussinesStation } from '../../interfaces/ResponseBussines.interface';
import { IResponseDependecies } from '../../interfaces/ResponseDependecies.interface';
import { IResponseStation } from '../../interfaces/ResponseStation.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BussinesService {
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
  GetBussines(idSupplier:number,token:string,idPerson:string):Observable<IResponseBussines>{
    return this.http.get<IResponseBussines>(`${environment.apiURL}bussines/${idSupplier}/${idPerson}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetBussinesXIdPerson(idPerson:string,token:string,action:string){
      return this.http.get<IResponseBussinesStation>(`${environment.apiURL}/bussines-x-person/${idPerson}/${action}`,{
        headers:{'x-access':token}
      }).
      pipe(
        catchError(this.handleError)
      )
  }
  GetStations(idBussine:number,token:string):Observable<IResponseStation>{
    return this.http.get<IResponseStation>(`${environment.apiURL}station/${idBussine}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetDependencies(idStation:number,token:string):Observable<IResponseDependecies>{
    return this.http.get<IResponseDependecies>(`${environment.apiURL}dependecies/${idStation}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetStationByIdPerson(idBussine:number,idPerson:string,token:string,action:string='DOC'):Observable<IResponseStation>{
    return this.http.post<IResponseStation>(`${environment.apiURL}person-station`,{idPerson,idBussine,options:action},{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetDependeciesByIdPerson(idStation:number,idPerson:string,token:string):Observable<IResponseDependecies>{
    return this.http.post<IResponseDependecies>(`${environment.apiURL}person-dependecies`,{idPerson,idStation,options:'DOC'},{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
}
