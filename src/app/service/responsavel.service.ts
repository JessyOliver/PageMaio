import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Responsavel } from '../model/Responsavel';
import { Crianca } from '../model/Crianca';
import { SegundoResponsavel } from '../model/SegundoResponsavel';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  //URL
 // baseUrl = 'https://turminha-feliz-app.onrender.com/responsavel';

  baseUrl = 'http://localhost:8080/responsavel';


  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
   headers: new HttpHeaders().set('Authorization', environment.token)
  }

  postResponsavel(cadResponsavel: Responsavel): Observable<Responsavel> {
    return this.http.post<Responsavel>(`${this.baseUrl}/cadastrar`, cadResponsavel, this.token);
  }

  //UPDATE
  updateResponsavel(editResponsavel: Responsavel): Observable<Responsavel> {
    return this.http.put<Responsavel>(`${this.baseUrl}/alterar`, editResponsavel, this.token);
  }
  
  //DELETE
  deleteResponsavel(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }

  //GET ID
  getById(id: number): Observable<Responsavel> {
    return this.http.get<Responsavel>(`${this.baseUrl}/${id}`, this.token);
  }
  
  //GET ALL
  getAllResponsavel(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(`${this.baseUrl}/all`, this.token);
  }

  //GET CPF
  getCpfResponsavel(cpf: string): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(`${this.baseUrl}/cpf/${cpf}`, this.token);
  }

  //GET NOME
  getNomeResponsavel(nome: string): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(`${this.baseUrl}/nome/${nome}`, this.token);
  }
 
  //GET CRIANÇA
  getCrianca(id: number): Observable<Crianca[]> {
    return this.http.get<Crianca[]>(`${this.baseUrl}/criancas/${id}`, this.token);
  }

  //GET SEGUNDO RESPONSAVEL
  getSegundoResponsavel(id: number): Observable<SegundoResponsavel[]> {
    return this.http.get<SegundoResponsavel[]>(`${this.baseUrl}/seguresponsavel/${id}`, this.token);
  }

}
