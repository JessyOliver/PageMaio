import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Reforco } from 'src/app/model/Reforco';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ReforcoService } from 'src/app/service/reforco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-edit-reforco',
  templateUrl: './visu-edit-reforco.component.html',
  styleUrls: ['./visu-edit-reforco.component.scss']
})
export class VisuEditReforcoComponent implements OnInit {

  getReforco: Reforco = new Reforco;
  
  listReforco!: Reforco[];

  reforcoNome!: string;

  idReforco!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private reforcoService: ReforcoService,
    private alerts: AlertsService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.findAllReforco();
    this.findByMateria();

  }

  findAllReforco() {
    this.reforcoService
    .getAllReforco()
    .subscribe((resp: Reforco[]) => {

      this.listReforco = resp;
    });
  }

  findByMateria() {

    if (this.reforcoNome == '') {
      
      this.findAllReforco();
    } 
    else {

      this.reforcoService
      .getMateriasReforco(this.reforcoNome)
      .subscribe((resp: Reforco[]) => {

         this.listReforco = resp;
      });
      
    }

  }

  getId(id: number) {
    this.idReforco = id;

    this.findByIdReforco(this.idReforco);  
  }
  
  findByIdReforco(id: number) {

    this.reforcoService
    .getIdReforco(id)
    .subscribe((resp: Reforco) => {

      this.getReforco = resp;
    });
  }

  deletarReforco() {

    this.reforcoService
    .deleteReforco(this.idReforco)
    .subscribe(() =>{

      this.router.navigate(["/visueditreforco"]);
      this.alerts.showAlertInfo("Reforço apagado com sucesso.");
      this.findAllReforco();

    }, error => {

      if (error == 400) {

        this.alerts.showAlertDanger("Reforço não encontrado.");
        this.router.navigate(['/visueditreforco']); 
      }

     }); 
  }

}
