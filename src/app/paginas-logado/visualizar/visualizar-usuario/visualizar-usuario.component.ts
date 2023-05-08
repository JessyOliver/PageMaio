import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pacote } from 'src/app/model/Pacote';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.scss']
})
export class VisualizarUsuarioComponent  implements OnInit{

  listUsuario!: User[];
  tipoUsuario!: string;
  idUsuario!: number;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private alerts: AlertsService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    //validando as ações do função
    this.findByAllUsuario();
    this.findByTipoUsuario();

  }

  findByAllUsuario() {

    this.auth
    .getAllUser()
    .subscribe((resp: User[]) => {

      this.listUsuario = resp;    

    });

  }

  findByTipoUsuario() {

    if (this.tipoUsuario == '') {
        
      this.findByAllUsuario();
    }
    else {

      this.auth
      .getByTipoUser(this.tipoUsuario)
      .subscribe((resp: User[]) => {
  
        this.listUsuario = resp;
      
      });

    }

  }

  getId(id: number) {
    this.idUsuario = id;
  }
    
  deletarUsuario() {

    this.auth
    .deleteUser(this.idUsuario)
    .subscribe(() =>{

      this.router.navigate(["/visusuario"]);
      this.alerts.showAlertInfo("Usuario apagado com sucesso.");
      this.findByAllUsuario();

    });

  }



}
