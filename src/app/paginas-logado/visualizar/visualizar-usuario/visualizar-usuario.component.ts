import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  idUsuarioTB!: number;

  nextButtonId = 1;
  selectedUserId: number | null = null;
  
  nomeUser!: string;
  usuario!: string;
  tipo!: string;

  getUser: User = new User;

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

    if (this.listUsuario && this.listUsuario.length > 0) {
      this.selectedUserId = this.listUsuario[0].id;
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
    this.nextButtonId++;
    this.findByIdUser(this.idUsuario);

  }
    
  findByIdUser(id: number) {

    this.auth
    .getByIdUser(id)
    .subscribe((resp: User) => {

      this.getUser = resp;

      if (resp.tipo == "ADMINISTRADOR") {

        for (let i = 0; i < resp.proprietario.length; i++) {
       
          this.nomeUser = resp.proprietario[i].nome;            
        }
          
      }
      else {

        for (let i = 0; i < resp.responsavel.length; i++) {
       
          this.nomeUser = resp.responsavel[i].nome;
        }

      }    

    });

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
