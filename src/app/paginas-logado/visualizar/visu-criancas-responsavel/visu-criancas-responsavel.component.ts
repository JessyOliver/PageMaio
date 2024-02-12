import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { Responsavel } from 'src/app/model/Responsavel';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-criancas-responsavel',
  templateUrl: './visu-criancas-responsavel.component.html',
  styleUrls: ['./visu-criancas-responsavel.component.scss']
})
export class VisuCriancasResponsavelComponent implements OnInit{
  
  listResponsavelCrianca!: Crianca[];

  getCrianca: Crianca = new Crianca;
  idCrianca!: number;

  nextButtonId = 1;
  selectedUserId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private responsavelService: ResponsavelService,
    private criancaService: CriancaService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    if (this.listResponsavelCrianca && this.listResponsavelCrianca.length > 0) {
      this.selectedUserId = this.listResponsavelCrianca[0].id;
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdCrianca(id);
    
  }

  getId(id: number) {

    this.idCrianca = id;
    this.nextButtonId++;
    this.findByIdCriancaService(this.idCrianca);     
  }

  findByIdCriancaService(id: number) {

    this.criancaService
    .getIdCrianca(id)
    .subscribe((resp: Crianca) => {

      this.getCrianca = resp;
    });

  }

  findByIdCrianca(id: number) {

    this.responsavelService
    .getCrianca(id)
    .subscribe((resp: Crianca[]) => {

      this.listResponsavelCrianca = resp;

    });

  }

  calcularIdade(dataNascimento: Date): number {
    const diffInMs = Date.now() - new Date(dataNascimento).getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
