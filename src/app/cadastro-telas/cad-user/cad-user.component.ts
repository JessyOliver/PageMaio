import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { environment } from 'src/environments/environment.prod';
import { minusculoValidator } from 'src/app/validations/minusculoValidator';

@Component({
  selector: 'app-cad-user',
  templateUrl: './cad-user.component.html',
  styleUrls: ['./cad-user.component.scss']
})
export class CadUserComponent implements OnInit{


  formulario!: FormGroup;

  cadUser: User = new User();
  listUser: User[] = [];

  listProp: Proprietario[] = [];

  confirmeSenha!: string;
  typeUser!: string;
  tipo: any;

  constructor(
    private propri: ProprietarioService,
    private authService: AuthService,
    private router: Router,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit(){
    window.scroll(0,0);

    this.authService.getAllUserOff().subscribe((resp: User[]) => {

      this.listUser = resp;

      if (this.listUser.length) {

        if (environment.token == '') {
          this.router.navigate(['/login']);
        }

        //forçando altenticação
        this.authService.refreshToken();

        let btnResp = <HTMLInputElement>document.getElementById("respon");
        let btnCancel = <HTMLInputElement>document.getElementById("btnCancelar");

        btnResp.style.display = "inline-block";
        btnCancel.style.display = "inline-block";

     }

    });

    this.propri.getAllProprietarioOff().subscribe((respProp: Proprietario[]) => {

      this.listProp = respProp;

             if (this.listProp.length ) {

                if (environment.token == '') {
                  this.router.navigate(['/cadproprietario']);
                }

                //forçando altenticação
                this.authService.refreshToken();

                let btnResp = <HTMLInputElement>document.getElementById("respon");
                let btnCancel = <HTMLInputElement>document.getElementById("btnCancelar");

                btnResp.style.display = "inline-block";
                btnCancel.style.display = "inline-block";

             }

             !this.authService.logged();

    });

    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email, minusculoValidator, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmSenha: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
    
    this.tipo = this.formulario.controls['tipo'];

    this.validatePreenchido();
    this.cadastrar();

  }

  validatePreenchido() {
    let usuario = <HTMLInputElement>document.getElementById('usuario');
    if (usuario?.value != '') {
      usuario.classList.add('preenchido');
    } else {
      usuario.classList.remove('preenchido');
    }
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


  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  tipoUser(event: any){
    this.typeUser = event.target.value
  }

  cadastrar(){

    let btnprop = <HTMLInputElement>document.getElementById('propri');
    let btnresp = <HTMLInputElement>document.getElementById('respon');

        // console.log(this.cadUser);

      /*   this.authService.addUser(this.cadUser).subscribe((resp: User) =>{
          this.cadUser = resp;
          this.alerts.showAlertSucess("Cadastro realizado com sucesso!");
        }); */

        btnprop.addEventListener('click', () =>{

          this.cadUser.tipo = this.typeUser;

          if (this.cadUser.senha != this.confirmeSenha) {

            this.alerts.showAlertDanger("As senhas estão diferentes.");

          }
          else {

            this.authService.addUser(this.cadUser).subscribe((resp: User) =>{

              this.cadUser = resp;
              this.router.navigate(["/cadproprietario"]);
             // this.alerts.showAlertSucess("Cadastro realizado com sucesso!");
            },
            erro => {
              switch (erro.status) {
                case 400:
                  console.log(erro.error.mensagem);
                  this.alerts.showAlertDanger(erro.error.mensagem);
                  break;

                case 404:
                  this.alerts.showAlertDanger(erro.error.mensagem);
                  console.log(erro.error.mensagem);
                  break;
              }
            }

              );
          }

        });

        btnresp.addEventListener('click', () =>{

          this.cadUser.tipo = this.typeUser;

          if (this.cadUser.senha != this.confirmeSenha) {

            this.alerts.showAlertDanger("As senhas estão diferentes.");

          }
          else {

            this.authService.addUser(this.cadUser).subscribe((resp: User) =>{

              this.cadUser = resp;
              this.router.navigate(["/cadresponsavel"]);
             // this.alerts.showAlertSucess("Cadastro realizado com sucesso!");
            });
          }
        });

  }




}
