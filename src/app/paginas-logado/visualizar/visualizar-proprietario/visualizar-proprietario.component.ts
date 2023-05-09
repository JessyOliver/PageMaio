import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visualizar-proprietario',
  templateUrl: './visualizar-proprietario.component.html',
  styleUrls: ['./visualizar-proprietario.component.scss']
})
export class VisualizarProprietarioComponent implements OnInit {

  listProprietario!: Proprietario[];

  nomeProprietario!: string;
  idProprietario!: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    private proprietarioService: ProprietarioService,
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
    this.findByAllProprietario();
    this.findByNomeProprietario();

  }

  findByAllProprietario() {

    this.proprietarioService
    .getAllProprietario()
    .subscribe((resp: Proprietario[]) => {

      this.listProprietario = resp;    

    });

  }

  findByNomeProprietario() {

    if (this.nomeProprietario == '') {
        
      this.findByAllProprietario();
    }
    else {

      this.proprietarioService
      .getListNomeProprietario(this.nomeProprietario)
      .subscribe((resp: Proprietario[]) => {
  
        this.listProprietario = resp;

      });

    }

  }

  getId(id: number) {
    this.idProprietario = id;
  }
    
  deletarPacote() {

    this.proprietarioService
    .deleteProprietario(this.idProprietario)
    .subscribe(() =>{

      this.router.navigate(["/visuproprietario"]);
      this.findByAllProprietario();
      this.alerts.showAlertInfo("Proprietário apagado com sucesso.");

    });
  }

}
