import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Proprietario } from 'src/app/model/Proprietario';
import { AuthService } from 'src/app/service/auth.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-proprietario',
  templateUrl: './detalhe-proprietario.component.html',
  styleUrls: ['./detalhe-proprietario.component.scss']
})
export class DetalheProprietarioComponent implements OnInit {

  getProprietario: Proprietario = new Proprietario;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private proprietarioService: ProprietarioService,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdProprietario(id);  
    
  }

  findByIdProprietario(id: number) {

    this.proprietarioService
    .getByIdProprietario(id)
    .subscribe((resp: Proprietario) => {

      this.getProprietario = resp;
    });

  }

}
