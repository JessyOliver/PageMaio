import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-criancas-responsavel',
  templateUrl: './visu-criancas-responsavel.component.html',
  styleUrls: ['./visu-criancas-responsavel.component.scss']
})
export class VisuCriancasResponsavelComponent implements OnInit{
  
  listResponsavelCrianca!: Responsavel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private responsavelService: ResponsavelService,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdCrianca(id);
    
  }


  findByIdCrianca(id: number) {

    this.responsavelService
    .getCrianca(id)
    .subscribe((resp: Responsavel[]) => {

      this.listResponsavelCrianca = resp;
    });

  }

  calcularIdade(dataNascimento: Date): number {
    const diffInMs = Date.now() - new Date(dataNascimento).getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
