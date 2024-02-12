import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AlertsService } from 'src/app/service/alerts.service';
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

  getResponsavel: Responsavel = new Responsavel;

  responsavelNome!: string;

  idResponsavel!: number;

  nextButtonId = 1;
  selectedUserId: number | null = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    private responsavelService: ResponsavelService,
    private alerts: AlertsService
  ){}

  ngOnInit() {
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    if (this.listResponsavel && this.listResponsavel.length > 0) {
      this.selectedUserId = this.listResponsavel[0].id;
    }

    //forçando altenticação
    this.auth.refreshToken();    

    // exibindo o responsável
    this.findAllResponsavel();
    this.findByNomeResponsavel();

  }

  getId(id: number) {
    
    this.idResponsavel = id;
    this.nextButtonId++;
    this.findByIdResponsavel(this.idResponsavel); 

  }

  findByIdResponsavel(id: number) {

    this.responsavelService
    .getById(id)
    .subscribe((resp: Responsavel) => {
      
      this.getResponsavel = resp;
    });
    
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

  deletarResponsavel() {

    this.responsavelService
    .deleteResponsavel(this.idResponsavel)
    .subscribe(() =>{

      this.router.navigate(["/visueditresponsavel"]);
      this.findAllResponsavel();
      this.alerts.showAlertInfo("Responsável apagado com sucesso.");

    });
  }

}
