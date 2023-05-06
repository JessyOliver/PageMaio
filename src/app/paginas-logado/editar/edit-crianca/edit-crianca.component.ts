import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Pacote } from 'src/app/model/Pacote';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-crianca',
  templateUrl: './edit-crianca.component.html',
  styleUrls: ['./edit-crianca.component.scss']
})
export class EditCriancaComponent implements OnInit{

  editCrianca: Crianca = new Crianca;

  gen!: string;
  opSaudT!: boolean;
  opSaudAOP!: boolean;
  opSaudMOP!: boolean;
  opSaudNEOP!: boolean;
  termoAceiteSelect!: boolean;
  dataBr!: Date;

  listerPacote: Pacote[] = [];
  pacote: Pacote = new Pacote;
  pacoteFK: Pacote = new Pacote;
  idPacotePg!: number;

  constructor(
    private authService: AuthService,
    private criancaService: CriancaService,
    private pacoteService: PacoteService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService
  ) {}

  ngOnInit(){
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdCrianca(id); 
    
    this.findByAllPacote();
    
  }

  findByIdCrianca(id: number) {

    this.criancaService
    .getIdCrianca(id)
    .subscribe((resp: Crianca) => {

      this.editCrianca = resp;
    });
    
  }

  genero(event: any){
    this.gen = event.target.value;
  }
 
  dataConvert(event: any){

    this.dataBr = event.target.value.split('/').reverse().join('-');
  }

  opSaudeT(event: any){
    this.opSaudT = event.target.value;
  }
 
  opSaudA(event: any){
    this.opSaudAOP = event.target.value;
  }
  
  opSaudM(event: any){
    this.opSaudMOP = event.target.value;
  }
  
  opSaudNE(event: any){
    this.opSaudNEOP = event.target.value;
  }

  termoAceiteOk(event: any){
    this.termoAceiteSelect = event.target.value;
  }


  findByAllPacote() {

    this.pacoteService
    .getAllPacote()
    .subscribe((resp: Pacote[]) => {

      this.listerPacote = resp;

    });
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  updateCrianca() {


    if (this.idPacotePg === undefined) {

      this.editCrianca.pacote;
    }
    else {

      this.pacoteFK.id = this.idPacotePg;
      this.editCrianca.pacote = this.pacoteFK;
    }

    if (this.gen === undefined) {
      
      this.editCrianca.genero;
    } 
    else {
      
      this.editCrianca.genero = this.gen;
    }
    
    if (this.dataBr === undefined) {
      
      this.editCrianca.dtNascimento;
    } 
    else {
      
      this.editCrianca.dtNascimento = this.dataBr;
    }

    if (this.opSaudT === undefined) {

      this.editCrianca.problemaSaude;      
    } 
    else {
      
      this.editCrianca.problemaSaude = this.opSaudT;      
    }

    if (this.opSaudAOP === undefined) {
      
      this.editCrianca.algumaAlergia;
    } 
    else {
      
      this.editCrianca.algumaAlergia = this.opSaudAOP;
    }

    if (this.opSaudMOP === undefined) {
      
      this.editCrianca.usoMedicamento;
    } 
    else {

      this.editCrianca.usoMedicamento = this.opSaudMOP;
    }

    if ( this.opSaudNEOP === undefined) {
      
      this.editCrianca.necessidadesEspeciais;
    } 
    else {

      this.editCrianca.necessidadesEspeciais = this.opSaudNEOP;
    }

    this.criancaService
    .putCrianca(this.editCrianca)
    .subscribe((resp: Crianca) => {

      console.log(resp)
/* 
      this.editCrianca = resp;
      this.alerts.showAlertSucess("Criança alterada com sucesso!");
      this.router.navigate(["/visueditcrianca"]); */
      
    }, 
    error => {

        if (error.status === 400) {

          this.alerts.showAlertInfo("Erro na alteração.");
        }
        else if (error.status === 401) {
          
          this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
          this.router.navigate(['/login']);
        }
        else if (error == 500) {

          this.alerts.showAlertDanger("Verifique os campos algum valor está incorreto.");
  
        }

    });

  }

}
