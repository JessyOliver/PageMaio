import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Contem } from '../model/Contem';

@Injectable({
  providedIn: 'root'
})
export class ContemService {

  //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/contem';

  baseUrl = 'http://localhost:8080/contem';

  constructor(private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

 //ADD
 postContem(cadContem: Contem): Observable<Contem> {
  return this.http.post<Contem>(`${this.baseUrl}/cadastrar`, cadContem, this.token);
}

//UPDATE
putContem(cadContem: Contem): Observable<Contem> {
  return this.http.put<Contem>(`${this.baseUrl}/alterar`, cadContem, this.token);
}

//DELETE
deleteContem(id: number) {

  return this.http.delete(`${this.baseUrl}/${id}`, this.token);
}



}
