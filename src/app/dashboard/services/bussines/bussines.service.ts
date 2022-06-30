import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IBussines, IDependecies, IStations } from 'src/app/auth/interfaces/bussines/Bussines.interfaces';
import { environment } from 'src/app/envieroment/env';
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
  GetStations(idBussine:number,idPerson:string,token:string):Observable<IResponseStation>{
    return this.http.get<IResponseStation>(`${environment.apiURL}station/${idBussine}/${idPerson}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetDependencies(idPerson:string,idStation:number,token:string):Observable<IResponseDependecies>{
    return this.http.get<IResponseDependecies>(`${environment.apiURL}dependecies/${idStation}/${idPerson}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }
  GetStationByIdPerson(idBussine:number,idPerson:string,token:string,action:string='DOC'):Observable<IResponseStation>{//?  ver
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
  SetBussine(idPerson:string,token:string,bussine:IBussines){
    return this.http.post(`${environment.apiURL}set-bussine/${idPerson}`,{bussine},{
      headers:{'x-access':token}
    })
    .pipe(catchError(this.handleError))
  }
  UpdateBussine(idPerson:string,token:string,bussine:IBussines){
    return this.http.put(`${environment.apiURL}update-bussine/${idPerson}/edit`,{bussine},{
      headers:{'x-access':token}
    })
    .pipe(catchError(this.handleError))
  }
  SetStation(idPerson:string,token:string,station:IStations){
    return this.http.post(`${environment.apiURL}set-station/${idPerson}`,{station},{
      headers:{'x-access':token}
    })
    .pipe(catchError(this.handleError))
  }
  UpdateStation(idPerson:string,token:string,station:IStations){
    return this.http.put(`${environment.apiURL}update-station/${idPerson}/edit`,{station},{
      headers:{'x-access':token}
    })
    .pipe(catchError(this.handleError))
  }
  SetDependencie(idPerson:string,token:string,dependecie:IDependecies){
    return this.http.post(`${environment.apiURL}set-dependecies/${idPerson}`,{dependecie},{
      headers:{'x-access':token}
    })
    .pipe(catchError(this.handleError))
  }
  UpdateDependencie(idPerson:string,token:string,dependecie:IDependecies){
    return this.http.put(`${environment.apiURL}update-dependecies/${idPerson}/edit`,{dependecie},{
      headers:{'x-access':token}
    })
    .pipe(catchError(this.handleError))
  }
}
