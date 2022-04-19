import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Perfil } from 'src/app/user/models/perfil.model';
import { environment } from 'src/environments/environment';
import { Phase } from '../models/phase.model';
import { PriorityLevel } from '../models/priority.model';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  public apiURL: string = environment.urlAPI;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


public registerNewTask(task: Task): Observable<any>{
    return this.http.post<any>(this.apiURL + "/phase/task", task)
    .pipe(
        retry(2),
        catchError(this.handleError))
}

getPhasesById(id: number): Observable<Phase> {
  return this.http.get<Phase>(`${this.apiURL}/phase/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError))
}


registerNewPhase(phase: Phase): Observable<any>{
  return this.http.post<any>(this.apiURL + "/phase", phase)
  .pipe(
    retry(2),
    catchError(this.handleError))
}

getPriority(): Observable<Array<PriorityLevel>> {
  return this.http.get<Array<PriorityLevel>>(this.apiURL + "/phase/task/priority")
    .pipe(
      retry(2),
      catchError(this.handleError))
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
