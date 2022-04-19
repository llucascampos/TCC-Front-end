import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, retry, switchMap, throwError } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'responseType': 'text'
      }
      ),
      observe: 'response' as 'body',
      responseType: 'text' as 'json',
  }

  public apiURL: string = environment.urlAPI;

  private menuBehaviorSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
  
  }



  login(login: LoginRequest): Observable<User> {
    return this.http.post<any>(this.apiURL + "/login", login, this.httpOptions)
      .pipe(switchMap(res => {
        sessionStorage.setItem('token', res.headers.get('Authorization'))
    
        return this.http.get<User>(this.apiURL + "/user/" + res.body).pipe(
          map(user => {
            console.log(user)
            sessionStorage.setItem('userId', user.id.toString())
            sessionStorage.setItem('userName', user.name)
            sessionStorage.setItem('userPerfil', user.perfilUser)
            sessionStorage.setItem('user', JSON.stringify(user))
            console.log(res)
            return res;
            }
          )  
        )
      }));

}

logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('username');
}


enableMenu(showMenu: boolean){
  this.menuBehaviorSubject.next(showMenu)
}

getMenu(){
  return this.menuBehaviorSubject;
}



handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
};

}


