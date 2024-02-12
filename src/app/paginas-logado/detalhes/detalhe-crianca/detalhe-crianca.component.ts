import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Pacote } from 'src/app/model/Pacote';
import { PagamentoPacote } from 'src/app/model/PagamentoPacote';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { PagamentoPacoteService } from 'src/app/service/pagamento-pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.scss']
})
export class DetalheCriancaComponent implements OnInit{

  formulario!: FormGroup;

  listCrianca!: number[];
  listPacote!: number[];
  criancaFK: Crianca = new Crianca();
  idCrianca!: number;
  nomeCrianca!: string;
  nomeResponsavel!: string;
  
  pacote: Pacote = new Pacote;
  pacoteFK: Pacote = new Pacote;
  idPacote!: number;
  nomePacote!: string;
  
  cadPagamentoPacote: PagamentoPacote = new PagamentoPacote();

  constructor(
    private router: Router,
    private auth: AuthService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private pagamentoPacService: PagamentoPacoteService,
    private pacoteService: PacoteService,
    private criancaService: CriancaService,
    private alerts: AlertsService,

  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.formulario = this.formBuilder.group({

      criancaNome: ['', [Validators.required]],
      dataPay: ['', [Validators.required]],
      tipoPacote: ['', [Validators.required]],

    });
  
    this.findAllCriancaSemPagPAcote();
    this.findAllPacoteSemPagPAcote();

  }

  findAllCriancaSemPagPAcote() {

    this.pagamentoPacService
      .getCriancaIdsWithoutPagamentoPacote()
      .subscribe((resp: number[]) => {

        this.listCrianca = resp;

      });
  }

  
  getIdCrianca(event: any){

    this.idCrianca = event.target.value;
    console.log("ID Criança: " + this.idCrianca);
    this.criancaService
    .getIdCrianca(this.idCrianca)
    .subscribe((respId: Crianca) => {

      this.nomeCrianca = respId.nome;
      this.nomeResponsavel = respId.responsavel.nome;
    });

    //this.idCrianca = id;
  }

  findAllPacoteSemPagPAcote() {

    this.pagamentoPacService
      .getPacoteIdsWithoutPagamentoPacote()
      .subscribe((resp: number[]) => {

        this.listPacote = resp;
      
      });
  }

  getIdPacote(event: any){

    this.idPacote = event.target.value;
    console.log("ID Pacote: " + this.idPacote);
    this.pacoteService
    .getIdPacote(this.idPacote)
    .subscribe((respId: Pacote) => {

      this.nomePacote = respId.tipoPacote;

    });

   // this.idPacotePg = id;

  }

  cadastrar() {

    this.criancaFK.id = this.idCrianca;
    this.cadPagamentoPacote.crianca = this.criancaFK;
    
    this.pacoteFK.id = this.idPacote;
    this.cadPagamentoPacote.pacote = this.pacoteFK;
    this.cadPagamentoPacote.status = false;

    this.pagamentoPacService.postPagamentoPacote(this.cadPagamentoPacote)
    .subscribe((resp: PagamentoPacote) => {

      console.log(resp);
      this.cadPagamentoPacote = resp;
      
      this.alerts.showAlertSucess("Criança cadastrada com sucesso!");
      this.router.navigate(["/inicio"]);

    }, error => {

      if (error.status === 401) {
        
        this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
        this.router.navigate(['/login']);
      }
      else if (error.status === 404) {


        this.alerts.showAlertDanger("A data de pagamento deve ser do dia de cadastro até o final do mês seguinte.");
        
      }
      else if (error.status === 500) {
        
        this.alerts.showAlertDanger("A data de pagamento deve ser do dia de cadastro até o final do mês seguinte.");
      }

    });
   

  }

 

}

