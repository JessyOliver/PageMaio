import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu-logged',
  templateUrl: './menu-logged.component.html',
  styleUrls: ['./menu-logged.component.scss']
})
export class MenuLoggedComponent implements OnInit {

  idUsu = environment.id;


  constructor(
    private router: Router,
    public authService: AuthService
  ){}

  nomeUser = environment.usuario;

  ngOnInit() {

    window.scroll(0, 0);

  //verificando se o usuario está logado
    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();
  }

  //Deslogar o usuário
  logOff(){
    environment.id = 0;
    environment.usuario = '';
    environment.tipo = '';
    environment.token = '';


    this.router.navigate(['/login']);
  }

}
