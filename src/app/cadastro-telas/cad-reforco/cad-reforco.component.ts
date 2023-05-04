import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reforco } from 'src/app/model/Reforco';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ReforcoService } from 'src/app/service/reforco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-reforco',
  templateUrl: './cad-reforco.component.html',
  styleUrls: ['./cad-reforco.component.scss']
})
export class CadReforcoComponent implements OnInit{

  formulario!: FormGroup;

  cadReforco: Reforco = new Reforco();

  nivelEstudos!: string;
  periodoCurso!: string;
  materias!: string;

  constructor(
    private auth: AuthService,
    private reforcoService: ReforcoService,
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

      materias: ['', [Validators.required]],
      nivelEstudos: ['', [Validators.required]],
      periodoCurso: ['', [Validators.required]],

    });
    
  }

  materiascad(event: any){
    this.materias = event.target.value
  }
 
  periodoCursocad(event: any){
    this.periodoCurso = event.target.value
  }
  
  nivelEstudoscad(event: any){
    this.nivelEstudos = event.target.value
  }

  cadastrar() {

    this.cadReforco.nivelEstudos = this.nivelEstudos;
    this.cadReforco.periodoCurso = this.periodoCurso;
    this.cadReforco.materias = this.materias;

    console.log("Cadastrar: " + this.nivelEstudos + ", " + this.periodoCurso + ", " + this.materias );
    
    this.reforcoService
    .getNivelEstudosAndPeriodoCursoAndMaterias(this.nivelEstudos, this.periodoCurso, this.materias)
    .subscribe((resp: any) => {
      
      if (resp.existe) {
        
        this.alerts.showAlertDanger(" já está cadastrado.???")

        console.log("resposta: ",resp)
        console.log("Cad 2: " + this.nivelEstudos + ", " + this.periodoCurso + ", " + this.materias );
        
      }
      
      this.alerts.showAlertDanger("Reforço com a matéria '" +
      this.materias + "', no período '" +
      this.periodoCurso + "', e nível " +
      this.nivelEstudos + ", já cadastrado no sistema.");
      
      console.log("Cad 3: " + this.nivelEstudos + ", " + this.periodoCurso + ", " + this.materias );
      
    }, error => {
      
      if (error === 401) {
        
        this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
        this.router.navigate(['/login']);
        
      }
      
      if (error === 404) {
        
       this.reforcoService
       .postReforco(this.cadReforco)
       .subscribe((resp: Reforco) => {

        this.cadReforco = resp;
        this.alerts.showAlertSucess("Reforço cadastrado com sucesso!");
        this.router.navigate(["/inicio"]);

       }, error => {

        if (error == 401) {

          this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
          this.router.navigate(['/login']); 
        }

        if (error == 500) {

          this.alerts.showAlertDanger("Confirme as informações inseridas, encontra-se incorreta.");  
        }

       });  

      }
      else {
        
       this.reforcoService
       .postReforco(this.cadReforco)
       .subscribe((resp: Reforco) => {

        this.cadReforco = resp;
        this.alerts.showAlertSucess("Reforço cadastrado com sucesso!");
        this.router.navigate(["/cadreforco"]);

       }, error => {

        if (error == 401) {

          this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
          this.router.navigate(['/login']);  
        }

        if (error == 500) {

          this.alerts.showAlertDanger("Confirme as informações inseridas, encontra-se incorreta.");  
        }

       });

      }

    });

  }

}
