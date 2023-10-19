import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visualizar-crianca',
  templateUrl: './visualizar-crianca.component.html',
  styleUrls: ['./visualizar-crianca.component.scss']
})
export class VisualizarCriancaComponent implements OnInit {

  listCrianca!: Crianca[];
  getCrianca: Crianca = new Crianca;

  criancaNome!: string;
  idCriancaSelecionada!: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    private criancaService: CriancaService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();
    
    this.findAllCrianca();
    this.findByNomeCrianca();

  }

  findAllCrianca() {
    this.criancaService
    .getAllCrianca()
    .subscribe((resp: Crianca[]) => {
      
      this.listCrianca = resp;
  
    });
  }



  findByNomeCrianca() {

    if (this.criancaNome == '') {
      this.findAllCrianca();
    }
    else {

      this.criancaService
      .getNomeCrianca(this.criancaNome)
      .subscribe((resp: Crianca[]) => {
        
        this.listCrianca = resp;
      });
    }

  }

}
