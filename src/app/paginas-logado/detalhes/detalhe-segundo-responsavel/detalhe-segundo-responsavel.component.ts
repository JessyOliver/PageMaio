import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SegundoResponsavel } from 'src/app/model/SegundoResponsavel';
import { AuthService } from 'src/app/service/auth.service';
import { SegundoResponsavelService } from 'src/app/service/segundo-responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-segundo-responsavel',
  templateUrl: './detalhe-segundo-responsavel.component.html',
  styleUrls: ['./detalhe-segundo-responsavel.component.scss']
})
export class DetalheSegundoResponsavelComponent implements OnInit {

  getSegunResponsavel: SegundoResponsavel = new SegundoResponsavel;

  nomeCrianca!: string;
  dtNasciCrianca!: Date;

  responavelId!: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private segunResponsavelService: SegundoResponsavelService,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdSegunResponsavel(id);  
    
  }

  findByIdSegunResponsavel(id: number) {

    this.segunResponsavelService
    .getById(id)
    .subscribe((resp: SegundoResponsavel) => {

      this.getSegunResponsavel = resp;
      this.responavelId = resp.responsavel.id;

      for (let i = 0; i < resp.responsavel.crianca.length; i++) {
           
        this.nomeCrianca = resp.responsavel.crianca[i].nome;   
        this.dtNasciCrianca = resp.responsavel.crianca[i].dtNascimento;   
               
      }

    });

  }


  
}
