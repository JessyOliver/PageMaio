import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { SegundoResponsavel } from 'src/app/model/SegundoResponsavel';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { SegundoResponsavelService } from 'src/app/service/segundo-responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-segundoresponsavel-responsavel',
  templateUrl: './visu-segundoresponsavel-responsavel.component.html',
  styleUrls: ['./visu-segundoresponsavel-responsavel.component.scss']
})
export class VisuSegundoresponsavelResponsavelComponent implements OnInit{

  listSegundoResponsavel!: SegundoResponsavel[];
  getSegunResponsavel: SegundoResponsavel = new SegundoResponsavel;
  idSegundoResponsavel!: number;

  nomeCrianca!: string;

  nomeCriancaModal!: string;
  dtNasciCrianca!: Date;
  responavelId!: number;

  nextButtonId = 1;
  selectedUserId: number | null = null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    public authService: AuthService,
    private responsavelService: ResponsavelService,
    private segundoResponsavelService: SegundoResponsavelService,

  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    if (this.listSegundoResponsavel && this.listSegundoResponsavel.length > 0) {
      this.selectedUserId = this.listSegundoResponsavel[0].id;
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdSegunResponsavel(id);

  }

  findByIdSegunResponsavel(id: number){

    this.responsavelService
    .getSegundoResponsavel(id)
    .subscribe((resp: SegundoResponsavel[]) => {

      this.listSegundoResponsavel = resp;
    });

  }
    

  getId(id: number) {

    this.idSegundoResponsavel = id;

    this.nextButtonId++;
    this.findByIdSegunResponsavelModal(this.idSegundoResponsavel);   
  }

  findByIdSegunResponsavelModal(id: number) {

    this.segundoResponsavelService
    .getById(id)
    .subscribe((resp: SegundoResponsavel) => {

      this.getSegunResponsavel = resp;
    
    });

  }

}

