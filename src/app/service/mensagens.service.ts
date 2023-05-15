import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Mensagem } from '../model/Mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

 //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/mensagem';
  baseUrl = 'http://localhost:8080/mensagem';

  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

    //ADD
    postMensagem(cadMensagem: Mensagem): Observable<Mensagem> {

      return this.http
        .post<Mensagem>(`${this.baseUrl}/cadastrar`, cadMensagem, this.token)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            
            return throwError(error.status);
          })
        );  
    }

  //UPDATE
  updatMensagem(editMensagem: Mensagem): Observable<Mensagem> {

    return this.http
      .put<Mensagem>(`${this.baseUrl}/alterar`, editMensagem, this.token)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.message);
        })
      );
  }
  
  //DELETE
  deleteMensagem(id: number) {

    return this.http.delete(`${this.baseUrl}/deletar/${id}`, this.token)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        
        return throwError(error.message);
      })
    );
  }

  //GET ALL
  getAllMensagem(): Observable<Mensagem[]> {
  
   return this.http
          .get<Mensagem[]>(`${this.baseUrl}/all`, this.token)
          .pipe(
            catchError((error: HttpErrorResponse) => {
             
              return throwError(error.message);
            })
          );
  }

  //GET-ID
  getIdMensagem(idMensagem: number): Observable<Mensagem> {

    return this.http
           .get<Mensagem>(`${this.baseUrl}/${idMensagem}`, this.token)
           .pipe(
            catchError((error: HttpErrorResponse) => {
             
              return throwError(error.message);
            })
    );
  }

  //GET-TITULO
  getTituloMensagem(titulo: string): Observable<Mensagem[]> {

    return this.http
           .get<Mensagem[]>(`${this.baseUrl}/titulo/${titulo}`, this.token)
           .pipe(
            catchError((error: HttpErrorResponse) => {
             
              return throwError(error.message);
            })
          );
  }

}
