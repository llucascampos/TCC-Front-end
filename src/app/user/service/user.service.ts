import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoHome } from '../models/infoHome.model';
import { NewUserRequest } from '../models/new-user-request.model';
import { Perfil } from '../models/perfil.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiURL: string = environment.urlAPI;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  public getUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiURL + "/user")
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.apiURL + "/user/" + email)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  public  getPerfil(): Observable<Array<Perfil>> {
    return this.http.get<Array<Perfil>>(this.apiURL + "/user/perfil")
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  public  getInfoHome(id: string): Observable<InfoHome> {
    return this.http.get<InfoHome>(this.apiURL + "/user/home/" + id)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  public registerNewUser(newUser: User): Observable<any>{
    return this.http.post<any>(this.apiURL + "/user", newUser)
    .pipe(
      retry(2),
      catchError(this.handleError))

  }

  public deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/user/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError))

  }

  public updatePassword(updatePassword: Object){
    return this.http.put<any>(this.apiURL + "/user/password", updatePassword)
        .pipe(
          retry(2)
        )
  };

  public updateProject(updateProject: Object){
    return this.http.put<any>(this.apiURL + "/user/project", updateProject)
        .pipe(
          retry(2)
        )
  };


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
