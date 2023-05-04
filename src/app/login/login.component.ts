import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Proprietario } from '../model/Proprietario';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userLogin: UserLogin = new UserLogin();
  listUser: User[] = [];
  cadPropri!: Proprietario;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertsMessage: AlertsService
  ){}


  ngOnInit(){
    window.scroll(0,0);

   // this.loginUser();
    this.verificarCadProprietario();
  }

  togglePass() {

   let senha = <HTMLInputElement>document.getElementById("senha");

    if (senha.type == "password") {
      senha.type = "text";
      document.getElementById('pass')!.style.display = 'none';
      document.getElementById('text')!.style.display = 'inline-block';
    }
    else {
      senha.type = "password";
      document.getElementById('text')!.style.display = 'none';
      document.getElementById('pass')!.style.display = 'inline-block';
    }
  }

  loginUser(){

    this.auth.loginSite(this.userLogin).subscribe((resp: UserLogin) => {

        console.log({resp});

        this.userLogin = resp;

        environment.id = this.userLogin.id;
        environment.usuario = this.userLogin.usuario;
        environment.tipo = this.userLogin.tipo;
        environment.token = this.userLogin.token;

        this.router.navigate(['/inicio']);

      }, 
      error => {

        if (error.status == 401) {
          //
          this.alertsMessage.showAlertDanger('Usuário ou senha, inválidos.');
        }
        
      });

  }

  verificarCadProprietario() {

    let cadPropriExists = <HTMLInputElement>document.querySelector('.user-cad');

    this.auth.getAllUserOff().subscribe((resp: User[]) => {

      this.listUser = resp;

      if (!this.listUser.length) {
        cadPropriExists!.style.display = 'inline-block';
      }
      else {
        cadPropriExists!.style.display = 'none';
      }

    });

  }

}
