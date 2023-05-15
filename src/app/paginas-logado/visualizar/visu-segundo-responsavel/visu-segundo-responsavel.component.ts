import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SegundoResponsavel } from 'src/app/model/SegundoResponsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { SegundoResponsavelService } from 'src/app/service/segundo-responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-segundo-responsavel',
  templateUrl: './visu-segundo-responsavel.component.html',
  styleUrls: ['./visu-segundo-responsavel.component.scss']
})
export class VisuSegundoResponsavelComponent implements OnInit{

  listSegundoResponsavel!: SegundoResponsavel[];

  nomeSegundoResponsavel!: string;

  idSegundoResponsavel!: number;

  nomeCrianca!: string;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private segundoResponsavelService: SegundoResponsavelService,
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
    this.findByAllSegundoResponsavel();
    this.findByNomeSegundoResponsavel();

  }

  findByAllSegundoResponsavel() {

    this.segundoResponsavelService
    .getAllSegunResponsavel()
    .subscribe((resp: SegundoResponsavel[]) => {

      this.listSegundoResponsavel = resp;   
      
      for (let i = 0; i < this.listSegundoResponsavel.length; i++) {
        const mensagem = this.listSegundoResponsavel[i];
        this.findByIdSegunResponsavel(mensagem.id);
      }

    });

  }

  findByNomeSegundoResponsavel() {

    if (this.nomeSegundoResponsavel == '') {
        
      this.findByAllSegundoResponsavel();
    }
    else {

      this.segundoResponsavelService
      .getNomeSegunResponsavel(this.nomeSegundoResponsavel)
      .subscribe((resp: SegundoResponsavel[]) => {
  
        this.listSegundoResponsavel = resp;

      });

    }

  }

  getId(id: number) {
    this.idSegundoResponsavel = id;
    
  }

  findByIdSegunResponsavel(id: number){

    this.segundoResponsavelService.getById(id).subscribe((resp: SegundoResponsavel) => {
  
      for (let i = 0; i < resp.responsavel.crianca.length; i++) {
           
        this.nomeCrianca = resp.responsavel.crianca[i].nome;   
               
      }

    });

  }
    
  deletarSegundoResponsavel() {

    this.segundoResponsavelService
    .deleteSegundoResponsavel(this.idSegundoResponsavel)
    .subscribe(() =>{

      this.router.navigate(["/visusegundoresponsavel"]);
      this.findByAllSegundoResponsavel();
      this.alerts.showAlertInfo("Segundo Responsavel apagado com sucesso.");

    });
    
  }

}

