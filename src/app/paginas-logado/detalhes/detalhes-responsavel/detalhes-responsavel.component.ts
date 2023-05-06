import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhes-responsavel',
  templateUrl: './detalhes-responsavel.component.html',
  styleUrls: ['./detalhes-responsavel.component.scss']
})
export class DetalhesResponsavelComponent implements OnInit {

  getResponsavel: Responsavel = new Responsavel;

  constructor(
    private router: Router,
    private auth: AuthService,
    private responsavelService: ResponsavelService,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdResponsavel(id); 

  }

  findByIdResponsavel(id: number) {

    this.responsavelService
    .getById(id)
    .subscribe((resp: Responsavel) => {
      
      this.getResponsavel = resp;
    });
    
  }
  
 
}
