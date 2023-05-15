import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/model/Agendamento';
import { Mensagem } from 'src/app/model/Mensagem';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AuthService } from 'src/app/service/auth.service';
import { MensagensService } from 'src/app/service/mensagens.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pacote-crianca',
  templateUrl: './pacote-crianca.component.html',
  styleUrls: ['./pacote-crianca.component.scss']
})
export class PacoteCriancaComponent implements OnInit {

  getMensagem: Mensagem = new Mensagem;

  nomeCrianca!: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private mensagemService: MensagensService,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByMensagens(id);  
    
  }
 
  findByMensagens(id: number) {

    this.mensagemService
    .getIdMensagem(id)
    .subscribe((resp: Mensagem) => {

      this.getMensagem = resp;

      for (let i = 0; i < resp.responsavel.crianca.length; i++) {
           
        this.nomeCrianca = resp.responsavel.crianca[i].nome;                  
      }

    });
  }
  

}
