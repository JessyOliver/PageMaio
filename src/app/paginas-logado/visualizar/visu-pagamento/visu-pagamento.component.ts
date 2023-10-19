import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { PagamentoStatusResponse } from 'src/app/model/PagamentoStatusResponse';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PagamentoPacoteService } from 'src/app/service/pagamento-pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-pagamento',
  templateUrl: './visu-pagamento.component.html',
  styleUrls: ['./visu-pagamento.component.scss']
})
export class VisuPagamentoComponent implements OnInit{

  statusPagamentos!: PagamentoStatusResponse[];
  criancaNome!: string;
  responavelNome!: string;
  idCriancaSelecionada!: number;

  constructor(   

    private router: Router,
    private auth: AuthService,
    public authService: AuthService,
    private criancaService: CriancaService,
    private pagamentoPacService: PagamentoPacoteService,


  ){}

  ngOnInit() {
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.carregarStatusPagamentos();

  }

  carregarStatusPagamentos() {

    this.pagamentoPacService
    .verificarStatusPagamentos()
    .subscribe((data: PagamentoStatusResponse[]) => {
      this.statusPagamentos = data;

       // Após carregar os dados, captura o ID da primeira criança automaticamente
       if (this.statusPagamentos.length > 0) {
        this.capturarIdCrianca(this.statusPagamentos[0]);
      }

    },
    (error: any) => {
      console.error('Error fetching payment statuses:', error);
      // Handle the error, show a message to the user, or retry the request.
    });

  }  

  capturarIdCrianca(status: PagamentoStatusResponse) {
    this.idCriancaSelecionada = status.crianca.id;
    console.log("Id: " + this.idCriancaSelecionada)

    this.capturarIdCrianca2(this.idCriancaSelecionada);
  }

  capturarIdCrianca2(id: number) {
    
    this.criancaService
    .getIdCrianca(id)
    .subscribe((resp: Crianca) => {

      this.responavelNome = resp.responsavel.nome;
    });
  }

}
