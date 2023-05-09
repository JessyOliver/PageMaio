import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-edit-crianca',
  templateUrl: './visu-edit-crianca.component.html',
  styleUrls: ['./visu-edit-crianca.component.scss']
})
export class VisuEditCriancaComponent implements OnInit{

  listCrianca!: Crianca[];

  criancaNome!: string;

  idCrianca!: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    private criancaService: CriancaService,
    private alerts: AlertsService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();
    
    this.findAllCrianca();
    this.findByNomeCrianca();

  }

  calcularIdade(dataNascimento: Date): number {
    const diffInMs = Date.now() - new Date(dataNascimento).getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  findAllCrianca() {
    this.criancaService
    .getAllCrianca()
    .subscribe((resp: Crianca[]) => {
      
      this.listCrianca = resp;
    });
  }

  findByNomeCrianca() {

    if (this.criancaNome == '') {
      this.findAllCrianca();
    }
    else {

      this.criancaService
      .getNomeCrianca(this.criancaNome)
      .subscribe((resp: Crianca[]) => {
        
        this.listCrianca = resp;
      });
    }

  }

  getId(id: number) {
    this.idCrianca = id;
  }

  deletarCrianca() {

    this.criancaService
    .deleteCrianca(this.idCrianca)
    .subscribe(() =>{

      this.router.navigate(["/visueditcrianca"]);
      this.findAllCrianca();
      this.alerts.showAlertInfo("Criança apagada com sucesso.");
    });
  }

}
