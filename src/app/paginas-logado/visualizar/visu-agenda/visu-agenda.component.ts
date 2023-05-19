import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'src/app/model/Agendamento';
import { Crianca } from 'src/app/model/Crianca';
import { Pacote } from 'src/app/model/Pacote';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-agenda',
  templateUrl: './visu-agenda.component.html',
  styleUrls: ['./visu-agenda.component.scss']
})
export class VisuAgendaComponent implements OnInit {

  listAgenda!: Agendamento[];

  dataAgendamentoget!: string;
  idAgendamento!: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    private agendamentoService: AgendamentoService,
    private alerts: AlertsService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    //validando as ações do função
    this.findByAllAgendamento();
    this.findByDataAgendamento();

  }
  

  findByAllAgendamento() {

    this.agendamentoService
    .getAllAgendamento()
    .subscribe((resp: Agendamento[]) => {

      this.listAgenda = resp;
    });

  }

  findByDataAgendamento() {

    if (this.dataAgendamentoget == null) {

      this.findByAllAgendamento();      
    } 
    else {
      
      this.agendamentoService
      .getDataAgendamento(this.dataAgendamentoget)
      .subscribe((resp: Agendamento[]) => {
  
        this.listAgenda = resp;
      });
    }

  }

  getId(id: number) {
    this.idAgendamento = id;
  }
    
  deletarPacote() {

    this.agendamentoService
    .deleteAgendamento(this.idAgendamento)
    .subscribe(() =>{

      this.router.navigate(["/visuagenda"]);
      this.findByAllAgendamento();
      this.alerts.showAlertInfo("Agendamento apagado com sucesso.");

    });
    
  }


}
