import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Pacote } from 'src/app/model/Pacote';
import { PagamentoPacote } from 'src/app/model/PagamentoPacote';
import { Responsavel } from 'src/app/model/Responsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { PagamentoPacoteService } from 'src/app/service/pagamento-pacote.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.scss']
})
export class DetalheCriancaComponent implements OnInit{

  formulario!: FormGroup;

  listCrianca!: Crianca[];
  criancaFK: Crianca = new Crianca();
  idCrianca!: number;
  
  listerPacote: Pacote[] = [];
  pacote: Pacote = new Pacote;
  pacoteFK: Pacote = new Pacote;
  idPacotePg!: number;
  
  cadPagamentoPacote: PagamentoPacote = new PagamentoPacote();
  
  listResponsavelCrianca!: Crianca[];
  idResponsavel!: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pagamentoPacService: PagamentoPacoteService,
    private pacoteService: PacoteService,
    private criancaService: CriancaService,
    private alerts: AlertsService,
    private reponsavelService: ResponsavelService

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
  
    this.idResponsavel = this.route.snapshot.params['id'];
    this.findByResponsavelCriancas(this.idResponsavel);
    
    this.findByAllPacote();
    this.findAllCrianca();

  }

  findByResponsavelCriancas(id: number) {

    this.criancaService
    .getCriancaResponsavelPagamento(id)
    .subscribe((resp: Crianca[]) => {
      this.listResponsavelCrianca = resp;
    });

  }
  
  findByAllPacote() {

    this.pacoteService
    .getAllPacote()
    .subscribe((resp: Pacote[]) => {

      this.listerPacote = resp;

    });
  }

  findAllCrianca() {

    this.criancaService
    .getListSemPagamento()
    .subscribe((resp: Crianca[]) => {
      
      this.listCrianca = resp;      

    });

  }

  cadastrar() {

    this.criancaFK.id = this.idCrianca;
    this.cadPagamentoPacote.crianca = this.criancaFK;
    
    this.pacoteFK.id = this.idPacotePg;
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

