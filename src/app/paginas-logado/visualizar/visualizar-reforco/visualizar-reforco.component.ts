import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Cursa } from 'src/app/model/Cursa';
import { Reforco } from 'src/app/model/Reforco';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { CursaService } from 'src/app/service/cursa.service';
import { ReforcoService } from 'src/app/service/reforco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visualizar-reforco',
  templateUrl: './visualizar-reforco.component.html',
  styleUrls: ['./visualizar-reforco.component.scss']
})
export class VisualizarReforcoComponent implements OnInit{

  listReforco!: Reforco[];

  reforcoNome!: string;

  cadCursa: Cursa = new Cursa();

  //FK
  reforcoFK: Reforco = new Reforco();
  
  criancaFK: Crianca = new Crianca();
  criancaPg: Crianca = new Crianca();
  idCrianca!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private criancaService: CriancaService,
    private reforcoService: ReforcoService,
    private cursaService: CursaService,
    private alerts: AlertsService,

  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.idCrianca = this.route.snapshot.params['id'];
    this.getByIdCrianca(this.idCrianca);

    this.findAllReforco();
    this.findByMateria();

  }

  getByIdCrianca(idCrianca: number) {

    this.criancaService
    .getIdCrianca(idCrianca)
    .subscribe((resp: Crianca) => {

      this.criancaPg = resp;
    });
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

  cadCursas(id: number, materias: string) {

    // chaves estranjeiras => fk
    this.criancaFK.id = this.idCrianca;
    this.cadCursa.crianca = this.criancaFK;

    this.reforcoFK.id = id;
    this.cadCursa.reforco = this.reforcoFK;

    this.cadCursa.statusCursa = true;

    this.cursaService
    .getMateriasIdCrianca(id, this.idCrianca)
    .subscribe((respExist: any) => {

      if (respExist.existe) {
          
        this.alerts.showAlertDanger("Já está cadastrado nessa aula.")
      }

      this.alerts.showAlertDanger("Criança já está cadastrada na aula de " + materias + ".");
      this.router.navigate(["/visureforco"]);

    },
    error => {

      if (error.status === 401 ) {

        this.alerts.showAlertDanger("Erro de autenticação, refaça o login.");
        this.router.navigate(['/login']);

      }
      else if (error.status === 404) {

        this.cursaService
        .postCursa(this.cadCursa)
        .subscribe((resp: Cursa) => {
          this.cadCursa = resp;
          this.alerts.showAlertSucess("Criança cadastrada nas aulas de " + materias + ", com sucesso!");
          this.router.navigate(["/visucrianca"]);
        });

      }

    });

  

  }

}
