import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Pacote } from '../model/Pacote';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/pacote';
  baseUrl = 'http://localhost:8080/pacote';

  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //ADD
  postPacote(cadPacote: Pacote): Observable<Pacote> {

    return this.http
      .post<Pacote>(`${this.baseUrl}/cadastrar`, cadPacote, this.token)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          
          return throwError(error.status);
        })
      );  
  }
  
  //UPDATE
  updatPacote(editPacote: Pacote): Observable<Pacote> {

    return this.http
      .put<Pacote>(`${this.baseUrl}/alterar`, editPacote, this.token)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.message);
        })
      );
  }
  
  //DELETE
  deletePacote(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        
        return throwError(error.message);
      })
    );
  }

  //GET ALL
  getAllPacote(): Observable<Pacote[]> {
  
   return this.http
          .get<Pacote[]>(`${this.baseUrl}/all`, this.token)
          .pipe(
            catchError((error: HttpErrorResponse) => {
             
              return throwError(error.message);
            })
          );
  }

  //GET-ID
  getIdPacote(idPacote: number): Observable<Pacote> {

    return this.http
           .get<Pacote>(`${this.baseUrl}/${idPacote}`, this.token)
           .pipe(
            catchError((error: HttpErrorResponse) => {
             
              return throwError(error.message);
            })
          );
  }
 
  //GET-TIPOPACOTE-AND-PERIODO
  getTipoPacoteAndPerido(tipoPacote: string, periodo: string): Observable<Pacote> {

    return this.http
           .get<Pacote>(`${this.baseUrl}/pacotes/${tipoPacote}/${periodo}`, this.token)  .pipe(
            catchError((error: HttpErrorResponse) => {
              
              return throwError(error.message);
            })
          );
  }
  
  //GET-TIPO
  getTipoPacote(tipoPacote: string): Observable<Pacote[]> {

    return this.http
           .get<Pacote[]>(`${this.baseUrl}/tipo/${tipoPacote}`, this.token)
           .pipe(
            catchError((error: HttpErrorResponse) => {
             
              return throwError(error.message);
            })
          );
  }
  
  //GET-PERIODO
  getPeriodoPacote(periodoPacote: string): Observable<Pacote[]> {
    
    return this.http
           .get<Pacote[]>(`${this.baseUrl}/perido/${periodoPacote}`, this.token)
           .pipe(
            catchError((error: HttpErrorResponse) => {
              
              return throwError(error.message);
            })
          );
  }

}
