import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/model/Agendamento';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PacoteService } from 'src/app/service/pacote.service';

@Component({
  selector: 'app-pacote-crianca',
  templateUrl: './pacote-crianca.component.html',
  styleUrls: ['./pacote-crianca.component.scss']
})
export class PacoteCriancaComponent implements OnInit{
  
  ngOnInit() {
      
  }

  formulario!: FormGroup;

  cadAgendamento: Agendamento = new Agendamento();

  get formPerguntas(): FormArray {
    return this.formulario.get('perguntas') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private perguntaService: AgendamentoService
  ) {
    this.formulario = this.fb.group({
      nome: [null, [Validators.required]],
      perguntas: this.fb.array([
        // Aqui vamos passar n FormGroup's
      ]),
    });

    this.perguntaService
      .postAgendamento(this.cadAgendamento)
      .subscribe((perguntas) => {
        console.log(perguntas);
        // ***********************************
        // Faz um loop para criar um FormGroup
        // para cada pergunta.
        // Cada FormGroup é adicionado no
        // FormArray "perguntas"
        // ***********************************
        // ***********************************
        // Faz um loop para criar um FormGroup
        // para cada pergunta.
        // Cada FormGroup é adicionado no
        // FormArray "perguntas"
        // ***********************************
        perguntas['forEach']((pergunta: any) => {
          const formGroupPergunta =
            this.criarFormGroupPergunta(pergunta);

          this.formPerguntas.push(formGroupPergunta);
        });
      });
  }

  postarDados() {
    const dados = this.formulario.value;
    console.log(dados);
  }

  criarFormGroupPergunta(pergunta: Agendamento): FormGroup {
    return this.fb.group({
      id: [pergunta.id, [Validators.required]],
      resposta: [null, [Validators.required]],
      pergunta: {
        dataAgendamento: pergunta.dataAgendamento,
        horarioEntrada: pergunta.horarioEntrada,
        horarioSaida: pergunta.horarioSaida,
        observacao: pergunta.observacao,
        disabled: true,
      },
    });
  }
}
