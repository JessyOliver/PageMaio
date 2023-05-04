import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Cursa } from '../model/Cursa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursaService {

//URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/cursa';

  baseUrl = 'http://localhost:8080/cursa';

  constructor(private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //ADD
  postCursa(cadCursa: Cursa): Observable<Cursa> {
    return this.http.post<Cursa>(`${this.baseUrl}`, cadCursa, this.token);
  }
  
  //UPDATE
  putCursa(cadCursa: Cursa): Observable<Cursa> {
    return this.http.put<Cursa>(`${this.baseUrl}`, cadCursa, this.token);
  }

  //DELETE
  deleteCursa(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }


//GET-ID
  getIdCrianca(idCrianca: number): Observable<Cursa> {

    return this.http.get<Cursa>(`${this.baseUrl}/crianca/${idCrianca}`, this.token);
  }

  //GET-ID
  getMateriasIdCrianca(reforco: number, idCrianca: number): Observable<Cursa> {

    return this.http.get<Cursa>(`${this.baseUrl}/cursos/${reforco}/${idCrianca}`, this.token);
  }

}
