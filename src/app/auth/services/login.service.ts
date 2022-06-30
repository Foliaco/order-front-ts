import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';
import { ILogin } from '../interfaces/Login.interface';
import { IResponsePerson } from 'src/app/dashboard/interfaces/ResponsePerson.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/envieroment/env';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient,
    private router:Router
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

  Login(username:string,password:string):Observable<ILogin>{
    console.log(username,password)
      return this.http.post<ILogin>(`${environment.apiURL}person-login`,{username,password}).
      pipe(
        catchError(this.handleError)
        )
  }

  Logout(lc:LocalStorageService){
    alert("No has iniciado session");
    lc.clearAll();
    this.router.navigate(['']);
    return;
  }

  GetSession(token:string):Observable<any>{
    return this.http.post<ILogin>(`${environment.apiURL}get-session`,{},{
        headers:{"x-access":token}
    }).
    pipe(
      catchError(this.handleError)
      )
  }

  GetOnePerson(idPerson:string,token:string):Observable<IResponsePerson>{
    console.log("one person")
    return this.http.get<IResponsePerson>(`${environment.apiURL}person/${idPerson}`,{
      headers:{'x-access':token}
    }).
    pipe(
      catchError(this.handleError)
    )
  }

}
