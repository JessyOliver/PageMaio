import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/model/Agendamento';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.scss']
})
export class EditAgendaComponent implements OnInit {

  editAgendamento: Agendamento = new Agendamento;


  constructor(
    private authService: AuthService,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
  ) {}

  ngOnInit(){
    
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdAgendamento(id);  
    
  }

  findByIdAgendamento(id: number) {

    this.agendamentoService
    .getIdAgendamento(id)
    .subscribe((resp: Agendamento) => {

      this.editAgendamento = resp;
    });

  }

  upDateAgenda() {

    
    this.agendamentoService
    .updateAgendamento(this.editAgendamento)
    .subscribe((resp: Agendamento) => {

      this.editAgendamento = resp;
      this.router.navigate(["/visuagenda"]);
      this.alerts.showAlertInfo("Agendamento alterado com sucesso.");

    },
    error => {
      if (error.status === 400) {

        this.alerts.showAlertInfo("Erro na alteração.");
      }
    });
  }

}
