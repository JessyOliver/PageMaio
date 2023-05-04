import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-proprietario',
  templateUrl: './cad-proprietario.component.html',
  styleUrls: ['./cad-proprietario.component.scss']
})
export class CadProprietarioComponent implements OnInit {

  formulario!: FormGroup;

  user: User = new User();
  userFK: User = new User();
  idUserN!: number;
  listUser: User[] = [];
 // idUser = environment.id;

 listProp: Proprietario[] = [];

  cadProprietario: Proprietario = new Proprietario();

  constructor(
    private authService: AuthService,
    private proprietarioService: ProprietarioService,
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
          this.router.navigate(['/cadproprietario']);
        }

        //forçando altenticação
        this.authService.refreshToken();

      }

      !this.authService.logged();

    });

    this.proprietarioService.getAllProprietarioOff().subscribe((respProp: Proprietario[]) => {

      this.listProp = respProp;

      if (this.listProp.length) {

        if (environment.token == '') {
          this.router.navigate(['/login']);
        }

        //forçando altenticação
        this.authService.refreshToken();

      }

      !this.authService.logged();

    });

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      cnjp: ['', [Validators.required, Validators.maxLength(14), Validators.pattern('[0-9 ]*')]],
      usuario: ['', [Validators.required]]
    });

    this.findByAllUserOff();

  }

  //get all user Response<User[]>
  findByAllUserOff() {
    this.authService.getAllUserOff()
      .subscribe((resp: User[]) => {
      //  this.listUser = JSON.parse(JSON.stringify(resp));
        this.listUser = resp;
      });
  }

  cadastrar(){

    //chave estrangeira => FK
    this.userFK.id = this.idUserN;
    this.cadProprietario.usuario = this.userFK;

    this.proprietarioService
    .postProprietario(this.cadProprietario)
    .subscribe((resp: Proprietario) => {

     // console.log(this.cadProprietario);
      this.cadProprietario = resp;
      this.router.navigate(["/login"]);
      this.alerts.showAlertSucess("Cadastro realizado com sucesso!");

    });


  }

}