import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public apiURL: string = environment.urlAPI;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getProject(): Observable<Array<Project>> {
      return this.http.get<Array<Project>>(this.apiURL + "/project")
        .pipe(
          retry(2),
          catchError(this.handleError))
    }

  public registerNewProject(project: Project): Observable<any>{
    return this.http.post<any>(this.apiURL + "/project", project)
    .pipe(
      retry(2),
      catchError(this.handleError))

  }

public registerNewTask(task: Task): Observable<any>{
  return this.http.post<any>(this.apiURL + "/project/task", task)
  .pipe(
    retry(2),
    catchError(this.handleError))
}

getprojectById(idProject: number): Observable<Project> {
  return this.http.get<Project>(`${this.apiURL}/project/${idProject}`)
    .pipe(
      retry(2),
      catchError(this.handleError))
}

getprojectByName(name: string): Observable<Array<Project>> {
  return this.http.get<Array<Project>>(`${this.apiURL}/project?nome=${name}`)
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

  public update(url: string, status: number, id:number): Observable<any>{
    let update = {
      id: id,
      status: status
    }

    return this.http.put<any>(this.apiURL + url, update)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }
}
