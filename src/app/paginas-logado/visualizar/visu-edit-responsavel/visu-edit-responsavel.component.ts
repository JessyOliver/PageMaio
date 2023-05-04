import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-visu-edit-responsavel',
  templateUrl: './visu-edit-responsavel.component.html',
  styleUrls: ['./visu-edit-responsavel.component.scss']
})
export class VisuEditResponsavelComponent implements OnInit {

  listResponsavel!: Responsavel[];

  responsavelNome!: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private responsavelService: ResponsavelService

  ){}

  ngOnInit() {
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    // exibindo o responsável
    this.findAllResponsavel();
    this.findByNomeResponsavel();

  }

  findAllResponsavel() {

    this.responsavelService.getAllResponsavel()
    .subscribe((resp: Responsavel[]) => {
      
      this.listResponsavel = resp;
    });
    
  }
  
  findByNomeResponsavel() {
    
    if (this.responsavelNome == '') {
      
      this.findAllResponsavel();
    }
    else{
      
      this.responsavelService
      .getNomeResponsavel(this.responsavelNome)
      .subscribe((resp: Responsavel[]) => {

        this.listResponsavel = resp;
      });

    }
    
  }

}
