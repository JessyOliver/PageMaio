import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  gen!: string;
  dataBr!: Date;
  horaEntrada!: string;
  horaEntradaFormatada!: string;
  hEntrada!: Time;

  horaSaida!: string;
  hSaida!: Time;
  horaSaidaFormatada!: string;

  cadAgenda: Agendamento = new Agendamento();
  agendaFK: Agendamento = new Agendamento();

  cadContem: Contem = new Contem();

  pacoteFK: Pacote = new Pacote();
  pacotePg: Pacote = new Pacote();
  idPacote!: number;

  quantidadeDiasPacote!: number;
  quantidadeDias!: number[];
  dia!: number;


  constructor(

    private auth: AuthService,
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

  

    this.formulario = this.formBuilder.group({});

    // Criar os controles para cada dia do pacote
    for (let i = 1; i <= this.pacotePg.qtdDias; i++) {
      const diaFormGroup = this.formBuilder.group({
        dataAgendamento: ['', Validators.required],
        horarioEntrada: ['', Validators.required],
        horarioSaida: ['', Validators.required],
      });

      this.formulario.addControl(`dia${i}`, diaFormGroup);
    }

    // Marcar todos os campos como tocados para exibir os erros de validação
    this.formulario.markAllAsTouched();


    this.idPacote = this.route.snapshot.params['id'];
    this.getByIdPacote(this.idPacote);

  }
  
  todosCamposValidos() {

    for (let i = 1; i <= this.quantidadeDias.length; i++) {

      const campoData = this.formulario.get(`dia${i}.dataAgendamento`);
      const campoEntrada = this.formulario.get(`dia${i}.horarioEntrada`);
      const campoSaida = this.formulario.get(`dia${i}.horarioSaida`);
  
      console.log("Campo Data: ", campoData, 
                  " Campo Entrada: ", campoEntrada,
                  " Campo Saída: ", campoSaida);
      if (
        campoData!.invalid ||
        campoEntrada!.invalid ||
        campoSaida!.invalid 
        ) {
          return false; // Se algum campo for inválido, retorna false
        }
      }
      
      return true; // Se todos os campos forem válidos, retorna true

  }
  
   
  dataValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
  
    const differenceInDays = Math.floor((selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays < 3) {
      return { menorDeTresDias: true };
    }

    // Verificar se a data é um final de semana (sábado ou domingo)
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 5 || selectedDate.getDay() === 6) {
      return { finalDeSemana: true };
    }
  
    return null;
  }

  getByIdPacote(id: number) {

    this.pacoteService.getIdPacote(id)
    .subscribe((resp: Pacote) => {

      this.pacotePg = resp;
      this.quantidadeDiasPacote = this.pacotePg.qtdDias;
      this.quantidadeDias = Array.from({ length: this.quantidadeDiasPacote }, (_, index) => index + 1);
      console.log("Pacote Id: ", this.idPacote);

        // Inicializar o formulário e criar os campos dinamicamente
      for (let i = 0; i < this.quantidadeDias.length; i++) {
        const dia = this.quantidadeDias[i];

        const diaFormGroup = this.formBuilder.group({
          dataAgendamento: ['', [Validators.required, this.dataValidator]],
          horarioEntrada: ['', [Validators.required, CustomValidators.horaValidator]],
          horarioSaida: ['', [Validators.required, CustomValidators.horaValidator]],    
          observacao: ['']
        });
  
        this.formulario.setControl(`dia${dia}`, diaFormGroup);

      }

    });

  }


  cadAgendamento() {

    

     if (this.formulario.valid) {

      for (let index = 0; index < this.quantidadeDias.length; index++) {

        const diaFormGroup = this.formulario.get(`dia${index + 1}`) as FormGroup;
        const dataAgendamento = diaFormGroup.get(`dia${index + 1}.dataAgendamento`)?.value;
        const horarioEntrada = diaFormGroup.get(`dia${index + 1}.horarioEntrada`)?.value;
        const horarioSaida = diaFormGroup.get(`dia${index + 1}.horarioSaida`)?.value;
        const observacao = diaFormGroup.get(`dia${index + 1}.observacao`)?.value;
      
        console.log("Valores do formulário: ");
        console.log(dataAgendamento);
        console.log(horarioEntrada);
        console.log(horarioSaida);
        console.log(observacao);

        const agendamento: Agendamento = {
          id: 0,
          status: true,
          dataAgendamento: dataAgendamento,
          horarioEntrada: horarioEntrada,
          horarioSaida: horarioSaida,
          observacao: observacao,
          contem: []
        };
   
        console.log("Agendamento: ")
        console.log(agendamento)

        this.agendaService
        .postAgendamento(agendamento)
        .subscribe((resp: Agendamento) => {

          this.cadAgenda = resp;
          this.alerts.showAlertSucess('Agendamento cadastrado com sucesso!');
          this.router.navigate(['/inicio']);
        },
        error => {
          if (error.status === 400) {
            
            this.alerts.showAlertDanger("Valores incorretos no cadastro.");
          }
          if (error.status === 401) {
            
            this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
            this.router.navigate(['/login']);
          }
          else if (error == 500) {

            this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
    
          }
        });

      }

    }

  }











 /*  this.formulario = this.formBuilder.group({

      dataAgendamento: ['', [Validators.required, this.dataValidator]],
      horarioEntrada: ['', [Validators.required, CustomValidators.horaValidator]],
      horarioSaida: ['', [Validators.required, CustomValidators.horaValidator]],
    
    }); */














 
  /* cadAgendamento() {
   
    const dataAgendamento = this.formulario.get('dataAgendamento')?.value;
    const horarioEntrada = this.formulario.get('horarioEntrada')?.value;
    const horarioSaida = this.formulario.get('horarioSaida')?.value;
  
    if (dataAgendamento && horarioEntrada && horarioSaida) {

      const [horasEntrada, minutosEntrada, segundosEntrada = '0'] = horarioEntrada.split(':');
      const horarioEntradaFormatado = `${padZero(Number(horasEntrada))}:${padZero(Number(minutosEntrada))}:${padZero(Number(segundosEntrada))}`;
  
      const [horasSaida, minutosSaida, segundosSaida = '0'] = horarioSaida.split(':');
      const horarioSaidaFormatado = `${padZero(Number(horasSaida))}:${padZero(Number(minutosSaida))}:${padZero(Number(segundosSaida))}`;
  
  
      console.log( "1 data: " + dataAgendamento + "entrada: "+ horarioEntrada + "Saída: " + horarioSaida)
      console.log( "2 data: " + dataAgendamento + "entrada: "+ horarioEntradaFormatado + "Saída: " + horarioSaidaFormatado)
   
      this.pacoteFK.id = this.idPacote;
      this.cadContem.pacote = this.pacoteFK;

      this.cadAgenda.dataAgendamento = dataAgendamento;
      this.cadAgenda.horarioEntrada = horarioEntrada;
      this.cadAgenda.horarioSaida = horarioSaida;
      this.cadAgenda.status = true;


    


        this.agendaService.postAgendamento(this.cadAgenda).pipe(
          mergeMap((resp: Agendamento) => {
            this.cadAgenda = resp;
            this.agendaFK.id = resp.id;
            this.cadContem.agendamento = this.agendaFK;
            return this.contemService.postContem(this.cadContem);
          })
        ).subscribe((resp: Contem) => {
          this.cadContem = resp;
          this.alerts.showAlertSucess('Agendamento cadastrado com sucesso!');
          this.router.navigate(['/inicio']);
        });
        
  
    }
  } */


  // ...
  
  /* cadAgendamento() {
    
    const dataAgendamento = this.formulario.get('dataAgendamento')?.value;
    const horarioEntrada = this.formulario.get('horarioEntrada')?.value;
    const horarioSaida = this.formulario.get('horarioSaida')?.value;
  
    if (dataAgendamento && horarioEntrada && horarioSaida) {  

      const agendamento: Agendamento = {
        dataAgendamento: dataAgendamento,
        horarioEntrada: horarioEntrada,
        horarioSaida: horarioSaida,
        status: true,
        id: 0,
        observacao: '',
        contem: []
      };
  
      this.agendaService.postAgendamento(agendamento).subscribe((resp: Agendamento) => {
        
        this.cadAgenda = resp;

        this.alerts.showAlertSucess('Agendamento cadastrado com sucesso!');
          this.router.navigate(['/inicio']);


      });

    }
  } */
  
  
}





 /*  this.agendaService
        .postAgendamento(this.cadAgenda)
        .subscribe((resp: Agendamento) => {

          this.cadAgenda = resp;

          this.agendaFK.id = resp.id;
          this.cadContem.agendamento = this.agendaFK;

          this.contemService
          .postContem(this.cadContem)
          .subscribe((resp: Contem) => {

            this.cadContem = resp;
            this.alerts.showAlertSucess('Agendamento cadastrado com sucesso!');
            this.router.navigate(['/inicio']);

          });


        }); */

        
        /*
        this.agendaFK.id = resp.id;

        const contem: Contem = {
          id: 0,
          agendamento: this.agendaFK,
          pacote: this.pacoteFK        
          
        };
  
         this.contemService.postContem(contem).subscribe((resp: Contem) => {
          this.cadContem = resp;
          this.alerts.showAlertSucess('Agendamento cadastrado com sucesso!');
          this.router.navigate(['/inicio']);
        }); */