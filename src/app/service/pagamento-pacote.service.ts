import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PagamentoPacote } from '../model/PagamentoPacote';
import { Observable } from 'rxjs';
import { PagamentoStatusResponse } from '../model/PagamentoStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class PagamentoPacoteService {

  baseUrl = 'http://localhost:8080/pagamentopa-cote';

  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  } 

  //POST
  postPagamentoPacote(requestData: any): Observable<PagamentoPacote> {

    return this.http.post<PagamentoPacote>(`${this.baseUrl}/cadastrar`, requestData, this.token);
  }

  //UPDATE
  updatePagamentoPacote(edtPagamento: PagamentoPacote) {

    return this.http.put<PagamentoPacote>(`${this.baseUrl}/alterar`, edtPagamento, this.token);
  }

  //DELETE
  deletePagamentoPacote(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }

  //GET ALL
  getAllPagamentoPacoteStatus(): Observable<PagamentoPacote[]> {

    return this.http.get<PagamentoPacote[]>(`${this.baseUrl}/all`, this.token);
  }
  
  //GET ID
  getByIdPagamentoPacoteStatus(id: number): Observable<PagamentoPacote> {

    return this.http.get<PagamentoPacote>(`${this.baseUrl}/${id}`, this.token);
  }

  verificarStatusPagamentos(): Observable<PagamentoStatusResponse[]> {
    return this.http.get<PagamentoStatusResponse[]>(`${this.baseUrl}/verificar-status`, this.token);
  }

}
