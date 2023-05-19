import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { SegundoResponsavel } from 'src/app/model/SegundoResponsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { SegundoResponsavelService } from 'src/app/service/segundo-responsavel.service';
import { Validacoes } from 'src/app/validations/validacoes';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-seg-responsavel',
  templateUrl: './cad-seg-responsavel.component.html',
  styleUrls: ['./cad-seg-responsavel.component.scss']
})
export class CadSegResponsavelComponent implements OnInit{

  formulario!: FormGroup;
  gen!: string;
/*   dataBr!: Date;
 */
  cadSegResponsavel: SegundoResponsavel = new SegundoResponsavel();

  responsavelFk: Responsavel = new Responsavel();
  responsavelIdPg: Responsavel = new Responsavel();
  idResponsavel!: number;

  constructor(
    private auth: AuthService,
    public  authService: AuthService,
    private responsavelService: ResponsavelService,
    private segResponsService: SegundoResponsavelService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ){}

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
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9 ]*'), Validacoes.ValidaCpf]],
      parentesco: ['', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]],
      celular: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9 ]*')]],
      telResidencial: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9 ]*')]],
      telComercial: ['', [Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9 ]*')]],
   
    });

    this.cadastrarSegunRes();

    this.idResponsavel = this.route.snapshot.params['id'];
    this.getByIdResponsavel(this.idResponsavel);

  }

  getByIdResponsavel(idResponsavel: number) {

    this.responsavelService.getById(idResponsavel)
    .subscribe((resp: Responsavel) => {

      this.responsavelIdPg = resp;

    });

  }

  genero(event: any){
    this.gen = event.target.value
  }

 /*  dataConvert(event: any){

    this.dataBr = event.target.value.split('/').reverse().join('-');
  } */

  cadastrarSegunRes() {

    //chave estrangeira => FK
    this.responsavelFk.id = this.idResponsavel;
    this.cadSegResponsavel.responsavel = this.responsavelFk;
    
    //itens tratados
    this.cadSegResponsavel.genero = this.gen;
/*     this.cadSegResponsavel.dtNascimento = this.dataBr;
 */
    this.segResponsService
    .postSegunResponsavel(this.cadSegResponsavel)
    .subscribe((resp: SegundoResponsavel) => {

    console.log("Responsavel", resp)

      this.cadSegResponsavel = resp;
      this.alerts.showAlertSucess("2° Responsável cadastrada com sucesso!");
      this.router.navigate(["/visuresponsavel"]);
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


}
