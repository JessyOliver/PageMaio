import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensagem } from 'src/app/model/Mensagem';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { MensagensService } from 'src/app/service/mensagens.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-mensagens',
  templateUrl: './visu-mensagens.component.html',
  styleUrls: ['./visu-mensagens.component.scss']
})
export class VisuMensagensComponent implements OnInit {

  listMensagem!: Mensagem[];
  tituloMensagem!: string;
  idMensagem!: number;
  idMensagemget!: number;

  nomeCrianca!: string;

  constructor(
    private auth: AuthService,
    private mensagemService: MensagensService,  
    private router: Router,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    //validando as ações do função
    this.findByAllMensagem();
    this.findByTituloMensagem();
  }

  getId(id: number) {
    this.idMensagem = id;
  }
  
  findByIdMensagem(id: number){

    this.mensagemService.getIdMensagem(id).subscribe((resp: Mensagem) => {
  
      for (let i = 0; i < resp.responsavel.crianca.length; i++) {
           
        this.nomeCrianca = resp.responsavel.crianca[i].nome;   
               
      }

    });

   /*  this.mensagemService
    .getIdMensagem(id)
    .subscribe((resp: Mensagem) => {

      
      for (let i = 0; i < resp.responsavel.crianca.length; i++) {
           
           this.nomeCrianca = resp.responsavel.crianca[i].nome;   
           
           console.log("Nome:", this.nomeCrianca)
          
       }

    }); */

  }

  findByAllMensagem() {

    this.mensagemService
    .getAllMensagem()
    .subscribe((resp: Mensagem[]) => {

      this.listMensagem = resp;    

      for (let i = 0; i < this.listMensagem.length; i++) {
        const mensagem = this.listMensagem[i];
        this.findByIdMensagem(mensagem.id);
      }
      
    });

  }

  findByTituloMensagem() {

    if (this.tituloMensagem == '') {
        
      this.findByAllMensagem();
    }
    else {

      this.mensagemService
      .getTituloMensagem(this.tituloMensagem)
      .subscribe((resp: Mensagem[]) => {
  
        this.listMensagem = resp;

      });

    }

  }
     
  deletarPacote() {

    this.mensagemService
    .deleteMensagem(this.idMensagem)
    .subscribe(() =>{

      this.router.navigate(["/visumensagem"]);
      this.findByAllMensagem();
      this.alerts.showAlertInfo("Mensagem apagada com sucesso.");

    });

  }

}