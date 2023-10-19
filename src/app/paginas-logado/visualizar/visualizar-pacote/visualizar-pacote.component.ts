import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pacote } from 'src/app/model/Pacote';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visualizar-pacote',
  templateUrl: './visualizar-pacote.component.html',
  styleUrls: ['./visualizar-pacote.component.scss']
})
export class VisualizarPacoteComponent implements OnInit{

  listPacote!: Pacote[];

  tipoPacote!: string;

  idPacote!: number;

  getPacote: Pacote = new Pacote;

  nextButtonId = 1;
  selectedUserId: number | null = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    private pacoteService: PacoteService,
    private alerts: AlertsService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    if (this.listPacote && this.listPacote.length > 0) {
      this.selectedUserId = this.listPacote[0].id;
    }

    //validando as ações do função
    this.findByAllPacote();
    this.findByTipoPacote();

  }

  findByAllPacote() {

    this.pacoteService
    .getAllPacote()
    .subscribe((resp: Pacote[]) => {

      this.listPacote = resp;    

    });

  }

  findByTipoPacote() {

    if (this.tipoPacote == '') {
        
      this.findByAllPacote();
    }
    else {

      this.pacoteService
      .getTipoPacote(this.tipoPacote)
      .subscribe((resp: Pacote[]) => {
  
        this.listPacote = resp;

      });

    }

  }

  getId(id: number) {
    this.idPacote = id;

    this.nextButtonId++;
    this.findByIdPacote(this.idPacote);  
    this.modalId(this.idPacote)
  }


  modalId(id: number) {

    document.getElementById('my-button')?.addEventListener('click', () => {
      this.getId(id);
    });
  }
    
  findByIdPacote(id: number) {

    this.pacoteService
    .getIdPacote(id)
    .subscribe((resp: Pacote) => {

      this.getPacote = resp;
    });
  }

  deletarPacote() {

    this.pacoteService
    .deletePacote(this.idPacote)
    .subscribe(() =>{

      this.router.navigate(["/visupacote"]);
      this.findByAllPacote();
      this.alerts.showAlertInfo("Pacote apagado com sucesso.");

    });
    
  }

}
