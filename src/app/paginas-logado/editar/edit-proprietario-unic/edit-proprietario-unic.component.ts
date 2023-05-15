import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-proprietario-unic',
  templateUrl: './edit-proprietario-unic.component.html',
  styleUrls: ['./edit-proprietario-unic.component.scss']
})
export class EditProprietarioUnicComponent implements OnInit {

  ///ALTERANDO PROPRIETÁRIO
  editProprietario: Proprietario = new Proprietario();

  idProprietario!: number;
  nomeProprietario!: string;
  cnjpProprietario!: string;

  constructor(
    private authService: AuthService,
    private proprietarioService: ProprietarioService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    ) {}

  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();

    let id = this.route.snapshot.params['id'];
   // this.findByIdProprietario();
    this.findByIdProprietario(id);

  }

  findByIdProprietario(id: number) {

    this.proprietarioService
    .getByIdProprietario(id)
    .subscribe((resp: Proprietario) => {

      this.editProprietario = resp
    });

  }
  
  nomeEdit(event: any){
    this.nomeProprietario = event.target.value;
  }
  
  cnpjEdit(event: any){
    this.cnjpProprietario = event.target.value;
  }

  updateUsuario() {
    if (this.nomeProprietario !== undefined) {
      this.editProprietario.nome = this.nomeProprietario;
    }
  
    if (this.cnjpProprietario !== undefined) {
      this.editProprietario.cnpj = this.cnjpProprietario;
    }
  
    this.proprietarioService
    .putProprietario(this.editProprietario)
    .subscribe(
        (resp: Proprietario) => {

          this.editProprietario = resp;
          this.alerts.showAlertSucess("Proprietário alterado com sucesso!");
          this.router.navigate(["/visuproprietario"]);

        },
        error => {

          if (error.status === 401) {

            this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
            this.router.navigate(['/login']);
          }
          else if (error.status === 400) {

            console.log("Proprietario: ", this.editProprietario);
            this.alerts.showAlertDanger("Não foi possível alterar.");
          }
          else if (error.status === 500) {

            console.log("Proprietario Id: ", this.editProprietario.id);
            console.log("Proprietario: ", this.editProprietario);
            this.alerts.showAlertDanger("Confirme as informações inseridas, encontra-se incorreta.");
          }
        }
      );
  }
  

}
