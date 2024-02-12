import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { CriancaPacoteData } from 'src/app/model/CriancaPacoteData';
import { Pacote } from 'src/app/model/Pacote';
import { PagamentoPacote } from 'src/app/model/PagamentoPacote';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PagamentoPacoteService } from 'src/app/service/pagamento-pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visualizar-crianca',
  templateUrl: './visualizar-crianca.component.html',
  styleUrls: ['./visualizar-crianca.component.scss'],
})
export class VisualizarCriancaComponent implements OnInit {
  listCrianca!: Crianca[];
  getCrianca: Crianca = new Crianca();

  criancaNome!: string;
  idCriancaSelecionada!: number;

  listPagamentoPacote: CriancaPacoteData[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private criancaService: CriancaService,
    private pacotePagamentoService: PagamentoPacoteService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.findAllCrianca();
    this.findByNomeCrianca();
    this.findAllPagamentoPacote();
  }

  findAllPagamentoPacote() {
    this.pacotePagamentoService
      .getCriancaAndPacoteByPagamentoPacote()
      .subscribe(
        (response: Array<any>) => {
          this.listPagamentoPacote = response.map((item: Array<any>) => {
            const criancaEntity: Crianca = item[0];
            const pacoteEntity: Pacote = item[1];

            console.log("ID: " + criancaEntity.id)
            console.log("Nome: " + criancaEntity.nome)

            return {
              criancaId: criancaEntity.id,
              nome: criancaEntity.nome,
              dtNascimento: criancaEntity.dtNascimento,
              genero: criancaEntity.genero,

              pacoteId: pacoteEntity.id,
              tipoPacote: pacoteEntity.tipoPacote,
              periodo: pacoteEntity.periodo,
              valorPacote: pacoteEntity.valorPacote,
              qtdDias: pacoteEntity.qtdDias
              
            };
          });
        },
        (error) => {
          console.error('Erro na solicitação HTTP:', error);
        }
      );
  }

  findAllCrianca() {
    this.criancaService.getAllCrianca().subscribe((resp: Crianca[]) => {
      this.listCrianca = resp;
    });
  }

  findByNomeCrianca() {
    if (this.criancaNome == '') {
      this.findAllCrianca();
    } else {
      this.criancaService
        .getNomeCrianca(this.criancaNome)
        .subscribe((resp: Crianca[]) => {
          this.listCrianca = resp;
        });
    }
  }
}
