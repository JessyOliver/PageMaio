import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Reforco } from '../model/Reforco';

@Injectable({
  providedIn: 'root'
})
export class ReforcoService {

  //URL
  // baseUrl = 'https://turminha-feliz-app.onrender.com/reforco';
  baseUrl = 'http://localhost:8080/reforco';

  constructor( private http: HttpClient) { }

  //Variable Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  } 

  //ADD
  postReforco(cadReforco: Reforco): Observable<Reforco> {

    return this.http
           .post<Reforco>(`${this.baseUrl}/cadastrar`, cadReforco, this.token);
  }

  //UPDATE
  updateReforco(editReforco: Reforco) {
    
    return this.http
           .put<Reforco>(`${this.baseUrl}/alterar`, editReforco, this.token);
  }

  //DELETE
  deleteReforco(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);    
  }

  //GET ALL
  getAllReforco(): Observable<Reforco[]> {

    return this.http
           .get<Reforco[]>(`${this.baseUrl}/all`, this.token);
  }

  //GET ID
  getIdReforco(id: number): Observable<Reforco> {
    
    return this.http
    .get<Reforco>(`${this.baseUrl}/${id}`, this.token);
  }

  // GET NIVELREFORCO PERIODO MATERIAS
  getNivelEstudosAndPeriodoCursoAndMaterias(nivelEstudos: string,
                                             periodoCurso: string,
                                             materias: string): Observable<Reforco> {
    
    return this.http.
           get<Reforco>(`${this.baseUrl}/cadastrados/${nivelEstudos}/${periodoCurso}/${materias}`, this.token);
  }

  //GET MATERIA
  getMateriasReforco(materias: string): Observable<Reforco[]> {
    
    return this.http
           .get<Reforco[]>(`${this.baseUrl}/materias/${materias}`, this.token);
  }

  //GET PERIODO
  getPeriodoReforco(periodo: string): Observable<Reforco[]> {
    
    return this.http
           .get<Reforco[]>(`${this.baseUrl}/periodo/${periodo}`, this.token);
  }

}
