import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Proprietario } from '../model/Proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/proprietario';
  baseUrl = 'http://localhost:8080/proprietario';

  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //Add 
  postProprietario(cadProprietrio: Proprietario) {
    return this.http.post<Proprietario>(`${this.baseUrl}/cadastrar`, cadProprietrio);
  }

  //update
  putProprietario(proprietario: Proprietario): Observable<Proprietario> {
    return this.http.put<Proprietario>(`${this.baseUrl}/alterar`, proprietario, this.token);
  }

  //DELETE
  deleteProprietario(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }
  
  //get's
  getAllProprietario(): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>(`${this.baseUrl}/all`, this.token);
  }

  //get's
  getAllProprietarioOff(): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>(`${this.baseUrl}/all`);
  }

  getListNomeProprietario(nome: string): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>(`${this.baseUrl}/nome/${nome}`, this.token);
  }

  getListCnpjProprietario(cnpj: string): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>(`${this.baseUrl}/${cnpj}`, this.token);
  }

  getByCnpjProprietario(cnpj: string): Observable<Proprietario> {
    return this.http.get<Proprietario>(`${this.baseUrl}/findByCnpj?cnpj=${cnpj}`, this.token);
  }

  getByIdProprietario(id: number): Observable<Proprietario> {
    return this.http.get<Proprietario>(`${this.baseUrl}/${id}`, this.token);
  }

}
