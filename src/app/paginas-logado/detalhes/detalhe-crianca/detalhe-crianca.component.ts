import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crianca } from 'src/app/model/Crianca';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.scss']
})
export class DetalheCriancaComponent implements OnInit{

  
  getCrianca: Crianca = new Crianca;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private criancaService: CriancaService
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

    this.criancaService
    .getIdCrianca(id)
    .subscribe((resp: Crianca) => {

      this.getCrianca = resp;
    });

  }

  calcularIdade(dataNascimento: Date): number {
    const diffInMs = Date.now() - new Date(dataNascimento).getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}

