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

     this.nomeUser = resp.proprietario[0].nome;

      for (let i = 0; i < resp.proprietario.length; i++) {
        const nome = resp.proprietario[i].nome;
        console.log(environment.tipo);

        if (resp.tipo === "ADMINISTRADOR") {
          
          this.nomeUser = resp.proprietario[i].nome;          
        }
        else {
  
          this.nomeUser = resp.responsavel[i].nome;
        }

      }
      
    });

  }



}
