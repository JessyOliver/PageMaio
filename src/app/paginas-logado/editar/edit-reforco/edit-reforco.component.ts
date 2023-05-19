import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reforco } from 'src/app/model/Reforco';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ReforcoService } from 'src/app/service/reforco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-reforco',
  templateUrl: './edit-reforco.component.html',
  styleUrls: ['./edit-reforco.component.scss']
})
export class EditReforcoComponent implements OnInit {

  editReforco: Reforco = new Reforco;

  nivelEstudos!: string;
  periodoCurso!: string;
  materias!: string;

  constructor(
    private authService: AuthService,
    private reforcoService: ReforcoService,
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
    this.findByIdReforco(id);  
    
  }

  findByIdReforco(id: number) {

    this.reforcoService
    .getIdReforco(id)
    .subscribe((resp: Reforco) => {

      this.editReforco = resp;

    });

  }
  
  materiascad(event: any){
    this.materias = event.target.value;
  }
 
  periodoCursocad(event: any){
    this.periodoCurso = event.target.value;
  }
  
  nivelEstudoscad(event: any){
    this.nivelEstudos = event.target.value;
  }

  updateReforco() {
    
    if (this.nivelEstudos === undefined) {
      
      this.editReforco.nivelEstudos;

    }
    else {

      this.editReforco.nivelEstudos = this.nivelEstudos;
    }

    if (this.periodoCurso ===  undefined) {
      
      this.editReforco.periodoCurso;
    }
    else {
      
      this.editReforco.periodoCurso = this.periodoCurso;
    }

    if (this.materias === undefined) {
      
      this.editReforco.materias;
    }
    else {

      this.editReforco.materias = this.materias;
    }


    this.reforcoService
       .updateReforco(this.editReforco)
       .subscribe((resp: Reforco) => {

        this.editReforco = resp;
        this.alerts.showAlertSucess("Reforço alterado com sucesso!");
        this.router.navigate(["/visueditreforco"]);

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

}
