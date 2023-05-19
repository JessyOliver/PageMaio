import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pacote } from 'src/app/model/Pacote';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-edit-pacote',
  templateUrl: './edit-pacote.component.html',
  styleUrls: ['./edit-pacote.component.scss']
})
export class EditPacoteComponent implements OnInit {

  editPacote: Pacote = new Pacote;

  tipoPacote!: string;
  periodo!: string;

  constructor(
    private authService: AuthService,
    private pacoteService: PacoteService,
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
    this.findByIdPacote(id);  
    
  }

  findByIdPacote(id: number) {

    this.pacoteService
    .getIdPacote(id)
    .subscribe((resp: Pacote) => {

      this.editPacote = resp;
    });

  }

  periodoPacoteCad(event: any){
    this.periodo = event.target.value
  }

  tipoPacoteCad(event: any){
    this.tipoPacote = event.target.value
  }

  updatePacote() {

    if (this.periodo ===  undefined) {
      
      this.editPacote.periodo;
    }
    else {
      
      this.editPacote.periodo = this.periodo;
    }

    if (this.tipoPacote === undefined) {
      
      this.editPacote.tipoPacote
    }
    else {

      this.editPacote.tipoPacote = this.tipoPacote;
    }

      this.pacoteService
      .updatPacote(this.editPacote)
      .subscribe((resp: Pacote) => {

        this.editPacote = resp;
        this.router.navigate(["/visupacote"]);
        this.alerts.showAlertInfo("Pacote alterado com sucesso.");

      },
      error => {
        if (error.status === 400) {

          this.alerts.showAlertInfo("Erro na alteração.");
        }
      });
    
    }

}
