import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Crianca } from '../model/Crianca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriancaService {

   //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/crianca';

  baseUrl = 'http://localhost:8080/crianca';

  constructor(private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //ADD
  postCrianca(cadCrianca: Crianca): Observable<Crianca> {

    return this.http.post<Crianca>(`${this.baseUrl}/cadastrar`, cadCrianca, this.token);
  }

  //UPDATE
  putCrianca(editCrianca: Crianca): Observable<Crianca> {
    
    return this.http.put<Crianca>(`${this.baseUrl}/alterar`, editCrianca, this.token);
  }

  //DELETE
  deleteCrianca(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }
  
  //GETALL
  getAllCrianca(): Observable<Crianca[]> {

    return this.http.get<Crianca[]>(`${this.baseUrl}/all`, this.token);
  }
  
  //GETALLSEMPAGAMENTO
  getListSemPagamento(): Observable<Crianca[]> {

    return this.http.get<Crianca[]>(`${this.baseUrl}/all-sem-pagamento`, this.token);
  }
  
  //GETALLPAGAMENTO
  getListAllPagamentoPacote(): Observable<Crianca[]> {

    return this.http.get<Crianca[]>(`${this.baseUrl}/all-pagamento`, this.token);
  }
  
  //GETALLSEMPAGAMENTO
  getListStatus(): Observable<Crianca[]> {

    return this.http.get<Crianca[]>(`${this.baseUrl}/all-status-pagamento`, this.token);
  }

  //GET-ID
  getIdCrianca(idCrianca: number): Observable<Crianca> {

    return this.http.get<Crianca>(`${this.baseUrl}/${idCrianca}`, this.token);
  }

  //GETNOME
  getNomeCrianca(nome: string): Observable<Crianca[]> {

    return this.http.get<Crianca[]>(`${this.baseUrl}/nome/${nome}`, this.token);
  }


}
