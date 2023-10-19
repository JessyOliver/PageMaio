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
    private auth: AuthService,
    public authService: AuthService,
    private router: Router,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit(){
    window.scroll(0,0);

    this.auth.getAllUserOff().subscribe((resp: User[]) => {

      this.listUser = resp;

      console.log("Lista de ", this.listUser)

      if (this.listUser.length) {

        if (environment.token) {
          this.router.navigate(['/cadusuario']);
        }

        //forçando altenticação
        this.auth.refreshToken();

        let btnResp = <HTMLInputElement>document.getElementById("respon");
        let btnCancel = <HTMLInputElement>document.getElementById("btnCancelar");

        btnResp.style.display = "inline-block";
        btnCancel.style.display = "inline-block";

     }

    // this.cadastrar();

    });

    this.propri.getAllProprietarioOff().subscribe((respProp: Proprietario[]) => {

      this.listProp = respProp;

             if (this.listProp.length) {

                if (environment.token == '') {
                  this.router.navigate(['/cadproprietario']);
                }

                //forçando altenticação
                this.auth.refreshToken();

                let btnResp = <HTMLInputElement>document.getElementById("respon");
                let btnCancel = <HTMLInputElement>document.getElementById("btnCancelar");

                btnResp.style.display = "inline-block";
                btnCancel.style.display = "inline-block";

             }

             !this.auth.logged();

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

      // this.authService.addUser(this.cadUser).subscribe((resp: User) =>{
      //   this.cadUser = resp;
      //   this.alerts.showAlertSucess("Cadastro realizado com sucesso!");
      // }); 

      btnprop.addEventListener('click', () =>{

        this.cadUser.tipo = this.typeUser;

        if (this.cadUser.senha != this.confirmeSenha) {

          this.alerts.showAlertDanger("As senhas estão diferentes.");

        }
        else {

          this.auth.addUser(this.cadUser).subscribe((resp: User) =>{

            this.cadUser = resp;
            
            this.router.navigate(["/cadproprietario"]);
           // this.alerts.showAlertSucess("Cadastro realizado com sucesso!");
          },
          error => {
            if (error.status === 400) {
              this.alerts.showAlertDanger("Valor incerido inválido.");
            }
            if (error.status === 401) {
              
              this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
              this.router.navigate(['/login']);
            }
            else if (error.status === 500) {
    
              this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
      
            }
          });
        }

      });

      btnresp.addEventListener('click', () =>{

        this.cadUser.tipo = this.typeUser;

        if (this.cadUser.senha != this.confirmeSenha) {

          this.alerts.showAlertDanger("As senhas estão diferentes.");

        }
        else {

          this.auth
          .addUser(this.cadUser)
          .subscribe((resp: User) =>{

            this.cadUser = resp;
            this.router.navigate(["/cadresponsavel"]);
           // this.alerts.showAlertSucess("Cadastro realizado com sucesso!");
          },
          error => {
            if (error.status === 400) {
              this.alerts.showAlertDanger("Valor incerido inválido.");
            }
            if (error.status === 401) {
              
              this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
              this.router.navigate(['/login']);
            }
            else if (error.status === 500) {
    
              this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
      
            }
          });
        }
      });

  }

  




}
