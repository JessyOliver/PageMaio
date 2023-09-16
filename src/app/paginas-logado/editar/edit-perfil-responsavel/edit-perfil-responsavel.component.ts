import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-perfil-responsavel',
  templateUrl: './edit-perfil-responsavel.component.html',
  styleUrls: ['./edit-perfil-responsavel.component.scss']
})
export class EditPerfilResponsavelComponent implements OnInit {

  //ALTERANDO USUÁRIO
  editUser: User = new User();
  listUser: User[] = [];
  userFK: User = new User();
  idUserN!: number;

  confirmeSenha!: string;
  primeiraSenhaps!: string;

  ///ALTERANDO PROPRIETÁRIO
  editResponsavel: Responsavel = new Responsavel();
  idResponsavel!: number;
  gen!: string;


  constructor(
    private auth: AuthService,
    public authService: AuthService,
    private responsavelService: ResponsavelService,
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
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
   // this.findByIdResponsavel();
    this.findByIdUser(id);

    this.findByAllUserAll();
  }

  findByIdUser(id: number){

    this.auth.getByIdUser(id)
    .subscribe((resp: User) => {

      this.editUser = resp;

      if (resp.tipo == "PADRÃO") {

        for (let i = 0; i < resp.responsavel.length; i++) {
        
          this.idResponsavel = resp.responsavel[i].id;  
          
          this.findByIdResponsavel(this.idResponsavel);
        }
          
      }
      
    });

  }

  findByIdResponsavel(id: number){

    this.responsavelService
    .getById(id)
    .subscribe((resp: Responsavel) =>{

        this.editResponsavel = resp;
    });
     
  }

  //get all user Response<User[]>
  findByAllUserAll() {
    this.auth.getAllUser()
      .subscribe((resp: User[]) => {
        this.listUser = resp;
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

  updateUsuario() {

    if (this.primeiraSenhaps !== undefined) {

      this.editUser.senha = this.primeiraSenhaps;
      
    }

    if (this.confirmeSenha !== undefined) {
      
      if (this.editUser.senha != this.confirmeSenha) {
  
        this.alerts.showAlertDanger("As senhas estão diferentes.");
  
      }
      else {
    
          this.authService
          .updateUser(this.editUser)
          .subscribe((respUser: User) =>{
  
            this.editUser = respUser;
            this.alerts.showAlertInfo("Usuário editado com sucesso!");

            environment.id = 0;
            environment.usuario = '';
            environment.tipo = '';
            environment.token = '';
            this.router.navigate(['/login']);
   
          });
  
      }

    }
    else {

      this.authService
      .updateUser(this.editUser)
      .subscribe((respUser: User) =>{

        this.editUser = respUser;
        this.alerts.showAlertInfo("Usuário editado com sucesso!");

        environment.id = 0;
        environment.usuario = '';
        environment.tipo = '';
        environment.token = '';
        this.router.navigate(['/login']);

      });
      
    }

  }


  genero(event: any){
    this.gen = event.target.value;
  }

  updateResponsavel() {
    
    if (this.gen ===  undefined) {
      
      this.editResponsavel.genero;
    }
    else {
      
      this.editResponsavel.genero = this.gen;
    }


    this.responsavelService
    .updateResponsavel(this.editResponsavel)
    .subscribe((resp: Responsavel) => {

/*       console.log(resp)
 */
      this.editResponsavel = resp;
      this.alerts.showAlertInfo("Responsável editado com sucesso.");

      environment.id = 0;
      environment.usuario = '';
      environment.tipo = '';
      environment.token = '';
      this.router.navigate(['/login']);

    },
    error => {
      if (error.status === 400) {

        this.alerts.showAlertInfo("Erro na alteração.");
      }
    });

  }

}
