import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-segundoresponsavel-responsavel',
  templateUrl: './visu-segundoresponsavel-responsavel.component.html',
  styleUrls: ['./visu-segundoresponsavel-responsavel.component.scss']
})
export class VisuSegundoresponsavelResponsavelComponent implements OnInit{

  listSegundoResponsavel!: Responsavel[];

  nomeCrianca!: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    public authService: AuthService,
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
    this.findByIdSegunResponsavel(id);

  }

  findByIdSegunResponsavel(id: number){

    this.responsavelService
    .getSegundoResponsavel(id)
    .subscribe((resp: Responsavel[]) => {

      this.listSegundoResponsavel = resp;
    });

  }
    

}

