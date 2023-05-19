import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/model/Agendamento';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-agenda',
  templateUrl: './detalhe-agenda.component.html',
  styleUrls: ['./detalhe-agenda.component.scss']
})
export class DetalheAgendaComponent {

  getAgendaDia: Agendamento = new Agendamento;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private agendamentoService: AgendamentoService,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdAgendamento(id);  
    
  }

  
  findByIdAgendamento(id: number) {

    this.agendamentoService
    .getIdAgendamento(id)
    .subscribe((resp: Agendamento) => {

      this.getAgendaDia = resp;

    });

  }

}
