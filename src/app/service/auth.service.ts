import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //URL serve
 // baseUrl = 'https://turminha-feliz-app.onrender.com/usuario';

 //URL local
  baseUrl = 'http://localhost:8080/usuario';

  constructor(
    private http: HttpClient
  ) { }

  //Variavel Token
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };

  //Forçar altenticação do usuário
  refreshToken() {

    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    };
  }

  //Logar
  loginSite(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
     `${this.baseUrl}/logar` , userLogin
    );
  }

  //Logged in site
  logged() {
    let ok: boolean = false;

    if (environment.token != '') {
      ok = true;
    }

    return ok;
  }

  adm() {
    let ok: boolean;

    if (environment.tipo == 'ADMINISTRADOR') {
      ok = true;
    }
    else {
      ok =false;
    }
    return ok;
  }

  //Add User
  addUser(user: User): Observable<User> {
    return this.http.post<User> (
      `${this.baseUrl}/cadastrar`, user
    );
  }

  //add User logged
  addUserOn(user: User): Observable<User> {
    return this.http.post<User> (
      `${this.baseUrl}/cadastrar`, user, this.token
    );
  }

  //update user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/atualizar`, user, this.token
    );
  }

  //DELET
  deleteUser(id: number) {

    return this.http.delete(`${this.baseUrl}/${id}`, this.token);
  }
  
  //getAll logoff
  getAllUserOff(): Observable<User[]> {
    return this.http.get<User[]>(
     `${this.baseUrl}/alloff`
     );
  }

   //getAll logeed
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/all`, this.token
    );
  }

  //get list nome
  getByNameUser(nome: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/nome/${nome}`, this.token
    );
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/${id}`, this.token
    );
  }

}
