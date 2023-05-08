import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pacote } from 'src/app/model/Pacote';
import { AuthService } from 'src/app/service/auth.service';
import { PacoteService } from 'src/app/service/pacote.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-pacote',
  templateUrl: './detalhe-pacote.component.html',
  styleUrls: ['./detalhe-pacote.component.scss']
})
export class DetalhePacoteComponent implements OnInit{

  getPacote: Pacote = new Pacote;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private pacoteService: PacoteService,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdPacote(id);  
    
  }

  findByIdPacote(id: number) {

    this.pacoteService
    .getIdPacote(id)
    .subscribe((resp: Pacote) => {

      this.getPacote = resp;
    });

  }

}
