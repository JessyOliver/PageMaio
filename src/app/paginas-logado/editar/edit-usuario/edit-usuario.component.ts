import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent {

  //ALTERANDO USUÁRIO
  editUser: User = new User();
  listUser: User[] = [];
  userFK: User = new User();
  idUserN!: number;

  confirmeSenha!: string;
  primeiraSenhaps!: string;
  typeUser!: string;
  senha!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    ) {}

  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdUser(id);
  }

  findByIdUser(id: number){

    this.authService.getByIdUser(id)
    .subscribe((resp: User) => {

        this.editUser = resp;
    });

  }

  togglePass() {

    let senha = <HTMLInputElement>document.getElementById("senha");

    if (senha !== undefined) {
      
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

  }

  togglePass2() {

      ///////////CAMPO CONFIRMAÇÃO DE SENHA

      let tipoConfirma = <HTMLInputElement>document.getElementById("confirmSenha");

      if (tipoConfirma !== undefined) {
        
        if (tipoConfirma.type == "password") {
          tipoConfirma.type = "text";
          document.getElementById('pass2')!.style.display = 'none';
          document.getElementById('text2')!.style.display = 'inline-block';
        }
        else {
          tipoConfirma.type = "password";
          document.getElementById('text2')!.style.display = 'none';
          document.getElementById('pass2')!.style.display = 'inline-block';
        }

      }

  }
  
  validatePreenchido() {

    let usuario = <HTMLInputElement>document.getElementById('usuario');
    
    if (usuario?.value != '') {

      usuario.classList.add('preenchido');
    } 
    else {

      usuario.classList.remove('preenchido');
    }

  }

  primeiraSenha(event: any){

    this.primeiraSenhaps = event.target.value;
  }

  confirmarSenha(event: any){

    this.confirmeSenha = event.target.value;
  }

  tipoUser(event: any){

    this.typeUser = event.target.value
  }

  updateUsuario() {

    if (this.senha != this.confirmeSenha) {
  
      this.alerts.showAlertDanger("As senhas estão diferentes.");

    }
    else {
  
        this.authService
        .updateUser(this.editUser)
        .subscribe((respUser: User) =>{

          this.editUser = respUser;
          this.router.navigate(["/visusuario"]);
          this.alerts.showAlertInfo("Usuário editado com sucesso!");
 
        });

    }

  }

}
