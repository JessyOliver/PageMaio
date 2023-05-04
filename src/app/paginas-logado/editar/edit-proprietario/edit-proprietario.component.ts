import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-proprietario',
  templateUrl: './edit-proprietario.component.html',
  styleUrls: ['./edit-proprietario.component.scss']
})
export class EditProprietarioComponent implements OnInit {

  //ALTERANDO USUÁRIO
  editUser: User = new User();
  listUser: User[] = [];
  userFK: User = new User();
  idUserN!: number;

  confirmeSenha!: string;
  typeUser!: string;

  ///ALTERANDO PROPRIETÁRIO
  editProprietario: Proprietario = new Proprietario();
  idProprietario!: number;

  constructor(
    private authService: AuthService,
    private proprietarioService: ProprietarioService,
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
    this.findByIdProprietario(id);
    this.findByIdUser(id);

    this.findByAllUserAll();
  }

  findByIdUser(id: number){

    this.authService.getByIdUser(id)
    .subscribe((resp: User) => {

        this.editUser = resp;
    });

  }

  findByIdProprietario(id: number){

    this.proprietarioService
    .getByIdProprietario(id)
    .subscribe((resp: Proprietario) =>{

        this.editProprietario = resp;
    });

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

  togglePass2() {

      ///////////CAMPO CONFIRMAÇÃO DE SENHA

      let tipoConfirma = <HTMLInputElement>document.getElementById("confirmSenha");

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

  modalShow() {
     document.getElementById('modalUserEdit');('shown.bs.modal');
  }

  validatePreenchido() {
    let usuario = <HTMLInputElement>document.getElementById('usuario');
    if (usuario?.value != '') {
      usuario.classList.add('preenchido');
    } else {
      usuario.classList.remove('preenchido');
    }
  }


  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  tipoUser(event: any){
    this.typeUser = event.target.value
  }

  updateUsuario() {

      this.editUser.tipo = this.typeUser;

      if (this.editUser.senha != this.confirmeSenha) {

        this.alerts.showAlertDanger("As senhas estão diferentes.");

      }
      else {

        console.log( this.editUser);

        try{

          this.authService
          .updateUser(this.editUser)
          .subscribe((respUser: User) =>{

            this.editUser = respUser;
            this.router.navigate(["/inicio"]);
            this.alerts.showAlertInfo("Usuário editado com sucesso! Faça seu login");

            environment.id = 0;
            environment.usuario = '';
            environment.tipo = '';
            environment.token = '';
            this.router.navigate(['/login']);

          });

        }
        catch(error){
            console.log(error);
            this.alerts.showAlertDanger("Menssagem: " + error);
        }

      }

  }

  updateProprietario() {

      //chave estrangeira => FK
      this.userFK.id = this.idUserN;
      this.editProprietario.usuario = this.userFK;

      this.proprietarioService
      .putProprietario(this.editProprietario)
      .subscribe((resp: Proprietario) => {

        console.log(resp);
        this.editProprietario = resp;
        this.router.navigate(["/inicio"]);
        this.alerts.showAlertInfo("Usuário editado com sucesso! Faça seu login");

        environment.id = 0;
        environment.usuario = '';
        environment.tipo = '';
        environment.token = '';
        this.router.navigate(['/login']);

      });

  }

  //get all user Response<User[]>
  findByAllUserAll() {
    this.authService.getAllUser()
      .subscribe((resp: User[]) => {
        this.listUser = resp;
      });
  }

}
