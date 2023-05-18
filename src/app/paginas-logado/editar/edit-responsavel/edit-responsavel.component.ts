import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-responsavel',
  templateUrl: './edit-responsavel.component.html',
  styleUrls: ['./edit-responsavel.component.scss']
})
export class EditResponsavelComponent {

  //ALTERANDO RESPONSÁVEL
  editResponsavel: Responsavel = new Responsavel();

  gen!: string;

  constructor(
    private authService: AuthService,
    private responsavelService: ResponsavelService,
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
    this.findByIdResponsavel(id);

  }

  findByIdResponsavel(id: number) {

    this.responsavelService
    .getById(id)
    .subscribe((resp: Responsavel) => {

      this.editResponsavel = resp;
    });
    
  }

  genero(event: any){
    this.gen = event.target.value;
  }

  updateResponsavel() {
    
    if (this.gen ===  undefined) {
      
      this.editResponsavel.genero;
    }
    else {
      
      this.editResponsavel.genero = this.gen;
    }


    this.responsavelService
    .updateResponsavel(this.editResponsavel)
    .subscribe((resp: Responsavel) => {

      console.log(resp)

      this.editResponsavel = resp;
      this.router.navigate(["/visueditresponsavel"]);
      this.alerts.showAlertInfo("Responsável editado com sucesso.");

    },
    error => {
      if (error.status === 400) {

        this.alerts.showAlertInfo("Erro na alteração.");
      }
    });

  }

}
