import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { validandoCpf } from 'src/app/validations/validaCpf';
import { Validacoes } from 'src/app/validations/validacoes';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-responsavel',
  templateUrl: './cad-responsavel.component.html',
  styleUrls: ['./cad-responsavel.component.scss']
})
export class CadResponsavelComponent implements OnInit{

  formulario!: FormGroup;

  user: User = new User();
  userFK: User = new User();
  idUser!: number;
  listUser: User[] = [];

  cadResponsavel: Responsavel = new Responsavel();

  gen!: string;
  dataBr!: Date;

  constructor(
    private responsService: ResponsavelService,
    private auth: AuthService,
    private router: Router,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.formulario = this.formBuilder.group({

      nome: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      dataNasc: ['', [Validators.required, Validacoes.MaiorQue18Anos]],
      tipoGen: ['', [Validators.required]],
/*       cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9 ]*'), validandoCpf]],
 */    
      cpf: ['', [validandoCpf]],
      celular: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9 ]*')]],
      telResidencial: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9 ]*')]],
      telComercial: ['', [Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9 ]*')]],
      cep: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('[0-9 ]*')]],
      rua: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      numCasa: ['', [Validators.required]],
      bairro: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      cidade: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      estado: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      usuario: ['', [Validators.required]],

    });

    this.findByAllUser();
  }



  //get all user Response<User[]>
  findByAllUser() {
    this.auth.getAllUser()
      .subscribe((resp: User[]) => {
      //  this.listUser = JSON.parse(JSON.stringify(resp));
        this.listUser = resp;
      });
  }

  genero(event: any){
    this.gen = event.target.value
  }

  dataConvert(event: any){

    this.dataBr = event.target.value.split('/').reverse().join('-');
  }

  cadastrar() {

    //chave estrangeira => FK
    this.userFK.id = this.idUser;
    this.cadResponsavel.usuario = this.userFK;

    this.cadResponsavel.genero = this.gen;
    this.cadResponsavel.dtNascimento = this.dataBr;

      this.responsService
      .postResponsavel(this.cadResponsavel)
      .subscribe((resp: Responsavel) => {
     
        this.cadResponsavel = resp;
        this.alerts.showAlertSucess("Responsável cadastrado com sucesso!");
        this.router.navigate(["/inicio"]);

      });

  }

}


