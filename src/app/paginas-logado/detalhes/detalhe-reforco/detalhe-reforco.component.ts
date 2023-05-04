import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reforco } from 'src/app/model/Reforco';
import { AuthService } from 'src/app/service/auth.service';
import { ReforcoService } from 'src/app/service/reforco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-reforco',
  templateUrl: './detalhe-reforco.component.html',
  styleUrls: ['./detalhe-reforco.component.scss']
})
export class DetalheReforcoComponent implements OnInit {

  
  getReforco: Reforco = new Reforco;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private reforcoService: ReforcoService
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdReforco(id);  

  }

  findByIdReforco(id: number) {

    this.reforcoService
    .getIdReforco(id)
    .subscribe((resp: Reforco) => {

      this.getReforco = resp;
    });
  }

}
