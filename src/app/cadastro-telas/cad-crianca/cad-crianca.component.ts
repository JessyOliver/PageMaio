import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Pacote } from 'src/app/model/Pacote';
import { Proprietario } from 'src/app/model/Proprietario';
import { Responsavel } from 'src/app/model/Responsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { Validacoes } from 'src/app/validations/validacoes';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-crianca',
  templateUrl: './cad-crianca.component.html',
  styleUrls: ['./cad-crianca.component.scss']
})
export class CadCriancaComponent implements OnInit{

  formulario!: FormGroup;

  cadCrianca: Crianca = new Crianca();

  gen!: string;
  opSaudT!: boolean;
  opSaudAOP!: boolean;
  opSaudMOP!: boolean;
  opSaudNEOP!: boolean;
  termoAceiteSelect!: boolean;
  dataBr!: Date;

  //FK
  proprietarioFk: Proprietario = new Proprietario();
  idProprietario = environment.id;

  responsavelFk: Responsavel = new Responsavel();
  responsavelIdPg: Responsavel = new Responsavel();
  idResponsavel!: number;

  listerPacote: Pacote[] = [];
  pacote: Pacote = new Pacote;
  pacoteFK: Pacote = new Pacote;
  idPacotePg!: number;

  //inputTipoProblemaSaude = <HTMLInputElement>document.querySelector("#tipoProblemaSaude");

  constructor(
    private criancaService: CriancaService,
    private responsavelService: ResponsavelService,
    private pacoteService: PacoteService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
      dataNasc: ['', [Validators.required, Validacoes.Maiorde12Anos]],
      tipoGen: ['', [Validators.required]],
      
      problemaSaude: ['', [Validators.required]],
      tipoProblemaSaude: ['', []],

      algumaAlergia: ['', [Validators.required]],
      tipoAlergia: ['', []],

      usoMedicamento: ['', [Validators.required]],
      qualMedicamento: ['', []],

      necessidadesEspeciais: ['', [Validators.required]],
      tipoNecessidadesEspeciais: ['', []],
      
      termoAceite: ['', [Validators.required]],

      tipoPacote: ['', [Validators.required]],
    
    });
  
    this.cadastrar();

    this.idResponsavel = this.route.snapshot.params['id'];
    this.getByIdResponsavel(this.idResponsavel);

    this.findByAllPacote();

  }

  getByIdResponsavel(idResponsavel: number) {

    this.responsavelService
    .getById(idResponsavel)
    .subscribe((resp: Responsavel) => {

      this.responsavelIdPg = resp;
    });

  }

  findByAllPacote() {

    this.pacoteService
    .getAllPacote()
    .subscribe((resp: Pacote[]) => {

      this.listerPacote = resp;

    });
  }

  genero(event: any){
    this.gen = event.target.value;
  }
 
  dataConvert(event: any){

    this.dataBr = event.target.value.split('/').reverse().join('-');
  }

  opSaudeT(event: any){
    this.opSaudT = event.target.value;
  }
 
  opSaudA(event: any){
    this.opSaudAOP = event.target.value;
  }
  
  opSaudM(event: any){
    this.opSaudMOP = event.target.value;
  }
  
  opSaudNE(event: any){
    this.opSaudNEOP = event.target.value;
  }
  
  termoAceiteOk(event: any){
    this.termoAceiteSelect = event.target.value;
  }

  cadastrar() {

    //chaves estrangeiras => FK
    this.proprietarioFk.id = this.idProprietario;
    this.cadCrianca.proprietario = this.proprietarioFk;
    
    this.responsavelFk.id = this.idResponsavel;
    this.cadCrianca.responsavel = this.responsavelFk;

    this.pacoteFK.id = this.idPacotePg;
    this.cadCrianca.pacote = this.pacoteFK;

    //itens tratados
    this.cadCrianca.genero = this.gen;
    this.cadCrianca.dtNascimento = this.dataBr;
    this.cadCrianca.problemaSaude = this.opSaudT;
    this.cadCrianca.algumaAlergia = this.opSaudAOP;
    this.cadCrianca.usoMedicamento = this.opSaudMOP;
    this.cadCrianca.necessidadesEspeciais = this.opSaudNEOP;
    this.cadCrianca.termoAceite = this.termoAceiteSelect;

    this.criancaService
    .postCrianca(this.cadCrianca)
    .subscribe((resp: Crianca) => {

      this.cadCrianca = resp;
      this.alerts.showAlertSucess("Criança cadastrada com sucesso!");
      this.router.navigate(["/inicio"]);
      
    }, 
    error => {

        if (error.status === 401) {
          
          this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
          this.router.navigate(['/login']);
        }
        else if (error == 500) {

          this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
  
        }

    });
   
  }

}
