import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agendamento } from 'src/app/model/Agendamento';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
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

  getAgendaDia: Agendamento = new Agendamento;

  nextButtonId = 1;
  selectedUserId: number | null = null;

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

    if (this.listAgenda && this.listAgenda.length > 0) {
      this.selectedUserId = this.listAgenda[0].id;
    }

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
    this.nextButtonId++;
    this.findByIdAgendamento(this.idAgendamento );
  }

  findByIdAgendamento(id: number) {

    this.agendamentoService
    .getIdAgendamento(id)
    .subscribe((resp: Agendamento) => {

      this.getAgendaDia = resp;

    });

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
