import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SegundoResponsavel } from '../model/SegundoResponsavel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegundoResponsavelService {

  //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/segundoresponsavel';

  baseUrl = 'http://localhost:8080/segundoresponsavel';

  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
 
  //ADD
  postSegunResponsavel(cadSegunResponsavel: SegundoResponsavel): Observable<SegundoResponsavel> {

    return this.http.post<SegundoResponsavel>(`${this.baseUrl}/cadastrar`, cadSegunResponsavel, this.token);
  }

  //UPDATE
  putSegundoResponsavel(edtSegunResponsavel: SegundoResponsavel): Observable<SegundoResponsavel> {

    return this.http.put<SegundoResponsavel>(`${this.baseUrl}/alterar`, edtSegunResponsavel, this.token);
  }

  //DELETE
  deleteSegundoResponsavel(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }

  //GET ID
  getById(id: number): Observable<SegundoResponsavel> {
    return this.http.get<SegundoResponsavel>(`${this.baseUrl}/${id}`, this.token);
  }

  //GETALL
  getAllSegunResponsavel(): Observable<SegundoResponsavel[]> {
    return this.http.get<SegundoResponsavel[]>(`${this.baseUrl}/all`, this.token);
  }

  //GET NOME
  getNomeSegunResponsavel(nome: string): Observable<SegundoResponsavel[]>{
    return this.http.get<SegundoResponsavel[]>(`${this.baseUrl}/nome/${nome}`, this.token);
  }

}
