import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SegundoResponsavel } from 'src/app/model/SegundoResponsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { SegundoResponsavelService } from 'src/app/service/segundo-responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-segundo-responsavel',
  templateUrl: './edit-segundo-responsavel.component.html',
  styleUrls: ['./edit-segundo-responsavel.component.scss']
})
export class EditSegundoResponsavelComponent implements OnInit {

  editSegResponsavel: SegundoResponsavel = new SegundoResponsavel;

  gen!: string;

  constructor(
    private auth: AuthService,
    private segResponsavelService: SegundoResponsavelService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
  ){}

  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken(); 

    let id = this.route.snapshot.params['id'];
    this.getBySegResponsavel(id);

  }

  getBySegResponsavel(id: number) {

    this.segResponsavelService
    .getById(id)
    .subscribe((resp: SegundoResponsavel) => { 

      this.editSegResponsavel = resp;
    });

  }

  genero(event: any){
    this.gen = event.target.value;
  }

  updateSegResponsavel() {

    if (this.gen ===  undefined) {
      
      this.editSegResponsavel.genero;
    }
    else {
      
      this.editSegResponsavel.genero = this.gen;
    }

    this.segResponsavelService
    .putSegundoResponsavel(this.editSegResponsavel)
    .subscribe((resp: SegundoResponsavel) => {

      console.log(resp)
      this.editSegResponsavel = resp;
      this.router.navigate(["/visusegundoresponsavel"]);
      this.alerts.showAlertInfo("2° Responsável, alterado com sucesso.");

    },
    error => {
      if (error.status === 400) {

        this.alerts.showAlertInfo("Erro na alteração.");

      }
    });

  }

}
