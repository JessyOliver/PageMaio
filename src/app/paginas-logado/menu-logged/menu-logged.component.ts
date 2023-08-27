import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu-logged',
  templateUrl: './menu-logged.component.html',
  styleUrls: ['./menu-logged.component.scss']
})
export class MenuLoggedComponent implements OnInit {

  
  idUsu = environment.id;

  nomeUser!: string;
  primeiroNome!: string;
  
  constructor(
    private router: Router,
    public authService: AuthService
    ){}
    

  ngOnInit() {

    window.scroll(0, 0);

  //verificando se o usuario está logado
    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();

    this.findById();
  }

  //Deslogar o usuário
  logOff(){
    environment.id = 0;
    environment.usuario = '';
    environment.tipo = '';
    environment.token = '';


    this.router.navigate(['/login']);
  }

  findById() {

    this.authService
    .getByIdUser(this.idUsu)
    .subscribe((resp: User)=> {

      for (let i = 0; i < resp.proprietario.length; i++) {

       // this.nomeUser = resp.proprietario[i].nome;


        if (resp.tipo == "ADMINISTRADOR") {
          
          this.nomeUser = resp.proprietario[i].nome;          
        }

      }

      for (let i = 0; i < resp.responsavel.length; i++) {

       // this.nomeUser = resp.proprietario[i].nome;


        if (resp.tipo == "PADRÃO") {
            
          this.nomeUser = resp.responsavel[i].nome;
        }

      }
      
    });

  }



}
