import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { get } from 'jquery';
import { Agendamento } from 'src/app/model/Agendamento';
import { Contem } from 'src/app/model/Contem';
import { Pacote } from 'src/app/model/Pacote';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ContemService } from 'src/app/service/contem.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { CustomValidators } from 'src/app/validations/horaValidator';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-agenda',
  templateUrl: './cad-agenda.component.html',
  styleUrls: ['./cad-agenda.component.scss']
})
export class CadAgendaComponent implements OnInit {  

  formulario!: FormGroup;

  cadAgenda: Agendamento = new Agendamento();
  agendaFK: Agendamento = new Agendamento();

  cadContem: Contem = new Contem();

  pacoteFK: Pacote = new Pacote();
  pacotePg: Pacote = new Pacote();
  idPacote!: number;
  pacotePeriodo!: string

  quantidadeDiasPacote!: number;
  quantidadeDias!: number[];

  constructor(

    private auth: AuthService,
    public authService: AuthService,
    private agendaService: AgendamentoService,
    private pacoteService: PacoteService,
    private contemService: ContemService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private formBuilder: FormBuilder,

  ){}
 
  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken(); 

    this.formulario = this.formBuilder.group({
      agendar : this.formBuilder.array([])
    });

    this.idPacote = this.route.snapshot.params['id'];
    this.getByIdPacote(this.idPacote);

  }

  dataValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
  
    const differenceInDays = Math.floor((selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays < 3) {
      return { menorDeTresDias: true };
    }

    // Verificar se a data é um final de semana (sábado ou domingo)
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 5 ) {
      return { finalDeSemana: true };
    }
  
    return null;
  }

  getByIdPacote(id: number) {

    this.pacoteService.getIdPacote(id)
    .subscribe((resp: Pacote) => {

      this.pacotePg = resp;
      this.quantidadeDiasPacote = this.pacotePg.qtdDias;
      this.pacotePeriodo = resp.periodo;
      this.createFormArray();

    });

  }

  createFormArray() {
    for (let i = 0; i < this.quantidadeDiasPacote; i++) {
      const newItem = this.formBuilder.group({
        dataAgendamento: ['', [Validators.required, this.dataValidator]],
        horarioEntrada: ['', [Validators.required, CustomValidators.horaValidator]],
        horarioSaida: ['', [Validators.required, CustomValidators.horaValidator]],
        observacao: ['']    
      });
      this.agendar.push(newItem);
    }
  }

  get agendar() {
    return this.formulario.get('agendar') as FormArray;
  }

  cadAgendamento() {

    this.pacoteFK.id = this.idPacote;
   // this.cadContem.pacote = this.pacoteFK;

    const agendamentosFormArray = this.formulario.get('agendar') as FormArray;
  
    const agendamentos = agendamentosFormArray.value.map((item: any) => {
      return {
        dataAgendamento: item.dataAgendamento,
        horarioEntrada: item.horarioEntrada,
        horarioSaida: item.horarioSaida,
        status: true,
        observacao: item.observacao
      };
    });
  
    const requestData = {
      agendamentoRequest: {
        agendar: agendamentos
      },
      contemRequest: {
        pacote: {
          id: this.pacoteFK.id
        }
      }
    };
  
    this.agendaService.postAgendamento(requestData)
      .subscribe((resp: Agendamento) => {

        this.cadAgenda = resp;
        this.alerts.showAlertSucess('Agendamento realizado com sucesso!');
        this.router.navigate(['/inicio']);
      },
      error => {
        if (error.status === 400) {
          this.alerts.showAlertDanger("Não é permitido agendar a mesma data mais de uma vez.");
        }
        if (error.status === 401) {
          
          this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
          this.router.navigate(['/login']);
        }
        else if (error.status === 500) {

          this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
  
        }
      });

  }
  
  

}