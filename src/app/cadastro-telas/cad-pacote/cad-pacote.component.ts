import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pacote } from 'src/app/model/Pacote';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-pacote',
  templateUrl: './cad-pacote.component.html',
  styleUrls: ['./cad-pacote.component.scss']
})
export class CadPacoteComponent implements OnInit {

  formulario!: FormGroup;

  valorPeriodo!: number;
  quantDias!: number;
  valorPacote!: number;
  tipoPacote!: string;
  periodo!: string;

  cadPacote: Pacote = new Pacote();
  buscaTipoPacoteAndPeriodo: Pacote = new Pacote();
  currencyPipe: any;

  constructor(
    private auth: AuthService,
    private pacoteService: PacoteService,
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

    this.formulario = this.formBuilder.group({

      valorPacote: ['', []],
      valorPeriodo: ['', [Validators.required, Validators.maxLength(7)]],
      qtdDias: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1),Validators.pattern('[1-9]+[0-9 ]*')]],
      tipoPacote: ['', [Validators.required]],
      periodo: ['', [Validators.required]],

    });

    this.calcular();

  }

  calcular() {
    this.valorPacote = this.valorPeriodo * this.quantDias;
  }

  periodoPacoteCad(event: any){
    this.periodo = event.target.value
  }
 
  tipoPacoteCad(event: any){
    this.tipoPacote = event.target.value
  }

  cadastrar() {
    
    this.cadPacote.valorPeriodo = this.valorPeriodo;
    this.cadPacote.qtdDias = this.quantDias;
   // this.cadPacote.valorPacote = this.valorPacote;
    this.cadPacote.tipoPacote = this.tipoPacote;
    this.cadPacote.periodo = this.periodo;

    this.pacoteService
    .getTipoPacoteAndPerido(this.tipoPacote, this.periodo)
    .subscribe((resp: any) => {

      if (resp.existe) {
        
        this.alerts.showAlertDanger(" já está cadastrado.")
      }

      this.alerts.showAlertDanger("Tipo de pacote '"+ this.tipoPacote +"' com período '" + this.periodo+ "', já está cadastrado.");
            
    },
    error => {
      
      if (error.status === 401 ) {

        this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
        this.router.navigate(['/login']);

      }
      else if (error.status === 404) {

       /*  if ( 
          (this.tipoPacote === "INTEGRAL" && this.periodo === "MANHÃ") ||
          (this.tipoPacote === "INTEGRAL" && this.periodo === "TARDE") ||
          (this.tipoPacote === "MENSAL" && this.periodo === "INTEGRAL") ||
          (this.tipoPacote === "SEMANAL" && this.periodo === "INTEGRAL") ||
          (this.tipoPacote === "AVULSO" && this.periodo === "INTEGRAL") 
        ) {
          
          this.alerts.showAlertDanger("O tipo de pacote '" + this.tipoPacote + 
                                      "', não pode ser cadastrado para o período '" + this.periodo + "'.");
        
        }
        else { */

          this.pacoteService
              .postPacote(this.cadPacote)
              .subscribe((resp: Pacote) => {
          
                this.cadPacote = resp;
                this.alerts.showAlertSucess("Pacote cadastrado com sucesso!");
                this.router.navigate(["/inicio"]);

              },
              error => {

                if (error == 401) {

                  this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
                  this.router.navigate(['/login']);
          
                }
                if (error == 500) {

                  this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
          
                }

              });

        /* }  */       

      }
      else {

      /*   if (
          (this.tipoPacote === "INTEGRAL" && this.periodo === "MANHÃ") ||
          (this.tipoPacote === "INTEGRAL" && this.periodo === "TARDE") ||
          (this.tipoPacote === "MENSAL" && this.periodo === "INTEGRAL") ||
          (this.tipoPacote === "SEMANAL" && this.periodo === "INTEGRAL") ||
          (this.tipoPacote === "AVULSO" && this.periodo === "INTEGRAL") 
        ) {
                    
          this.alerts.showAlertDanger("O tipo de pacote '" + this.tipoPacote + 
                                      "', não pode ser cadastrado para o período '" + this.periodo + "'.");

        }
        else { */

          this.pacoteService
          .postPacote(this.cadPacote)
          .subscribe((resp: Pacote) => {
      
            this.cadPacote = resp;
            this.alerts.showAlertSucess("Pacote cadastrado com sucesso!");
            this.router.navigate(["/inicio"]);

          },
          error => {

            if (error == 401) {

              this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
              this.router.navigate(['/login']);
      
            }
            if (error == 500) {

              this.alerts.showAlertDanger("Confirme as informações inseridas, encontra-se incorreta.");
      
            }

          });

       /*  } */   

      }
      
    });

  }

}
