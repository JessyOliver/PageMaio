import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Agendamento } from '../model/Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

   //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/agendamento';
  baseUrl = 'http://localhost:8080/agendamento';

  constructor( private http: HttpClient) { }

 //Variable Token
 token = {
  headers: new HttpHeaders().set('Authorization', environment.token)
 } 

   //ADD
   postAgendamento(cadAgendamento: Agendamento): Observable<Agendamento> {

    return this.http
           .post<Agendamento>(`${this.baseUrl}/cadastrar`, cadAgendamento, this.token);
  }

   //UPDATE
   updateAgendamento(editAgendamento: Agendamento) {
    
    return this.http
           .put<Agendamento>(`${this.baseUrl}/alterar`, editAgendamento, this.token);
  }

   //DELETE
   deleteAgendamento(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);    
  }

 //GET ALL
 getAllAgendamento(): Observable<Agendamento[]> {

  return this.http
         .get<Agendamento[]>(`${this.baseUrl}/all`, this.token);
}



}
