import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { PagamentoPacote } from 'src/app/model/PagamentoPacote';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PagamentoPacoteService } from 'src/app/service/pagamento-pacote.service';
import { environment } from 'src/environments/environment.prod';
import { format } from 'date-fns';


@Component({
  selector: 'app-visu-edit-pagamento',
  templateUrl: './visu-edit-pagamento.component.html',
  styleUrls: ['./visu-edit-pagamento.component.scss']
})
export class VisuEditPagamentoComponent implements OnInit{

  listPayPacote!: PagamentoPacote[];
  editPayPacote: PagamentoPacote = new PagamentoPacote;

  nextButtonId = 1;
  selectedUserId: number | null = null;

  statusPaymente!: boolean;

  listCrianca!: Crianca[];

  dataRe!: string;
  dataAtual!: string;
  idCrianca!: number;

  formatoBrasil = 'dd/MM/yyyy'; // Formato brasileiro (você pode ajustar conforme necessário)

  constructor(
    private router: Router,
    private auth: AuthService,
    public authService: AuthService,
    private pagamentoPacService: PagamentoPacoteService,
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

    this.dataAtual = format(new Date(), this.formatoBrasil); // Formate a data atual no formato desejado

    console.log("Data: " + this.dataAtual)
    this.findAllPayPacote();
    this.findAllCrianca();

  }

  findAllCrianca() {
   
    this.criancaService
    .getListAllPagamentoPacote()
    .subscribe((resp: Crianca[]) => {
      
      this.listCrianca = resp;      

    });

  }

  findAllPayPacote(){
    
    if (this.listPayPacote && this.listPayPacote.length > 0) {
      this.selectedUserId = this.listPayPacote[0].id;
    }

    this.pagamentoPacService
    .getAllPagamentoPacoteStatus()
    .subscribe((resp: PagamentoPacote[]) => {

      this.listPayPacote = resp;
    });
    
  }

  getId(id: number) {

    this.nextButtonId++;
    this.findByPagamentoPacote(id);     
  }

  findByPagamentoPacote(id: number){

    this.pagamentoPacService
    .getByIdPagamentoPacoteStatus(id)
    .subscribe((resp: PagamentoPacote) => {

      this.editPayPacote = resp;
    });
    
  }
  
  statusPay(event: any){
    this.statusPaymente = event.target.value;
  }


  updatePayPacote() {

    if (this.statusPaymente === undefined) {

      this.editPayPacote.status      
    } 
    else {
      
      this.editPayPacote.status = this.statusPaymente;      
    }

    this.dataRe = format(new Date(this.editPayPacote.dataPagamento), this.formatoBrasil); // Formate a data atual no formato desejado

    console.log("DataRe2: " + this.dataRe)

    console.log("Data: " + this.editPayPacote.dataPagamento)
    this.pagamentoPacService
    .updatePagamentoPacote(this.editPayPacote)
    .subscribe((resp: PagamentoPacote) => {

      this.editPayPacote = resp;

      this.alerts.showAlertSucess("Alteração realizada com sucesso!");
      this.router.navigate(["/visueditpagamento"]);

    }, error => {

      if (error.status === 400) {

        this.alerts.showAlertInfo("Erro na alteração.");

      }
      else if (error.status === 401) {
        
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

  updateCriancaNome(event: any) {
    const selectedCriancaId = event.target.value;

    // Encontre a criança correspondente com base no ID
    const selectedCrianca = this.listCrianca.find(crianca => crianca.id == selectedCriancaId);

    // Atualize o nome da criança no objeto editPayPacote
    if (selectedCrianca) {
        this.editPayPacote.crianca.nome = selectedCrianca.nome;
    }
}

}
