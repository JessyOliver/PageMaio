import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
  styleUrls: ['./detalhe-usuario.component.scss']
})
export class DetalheUsuarioComponent implements OnInit{

  
  getUser: User = new User;

  nomeUser!: string;
  usuario!: string;
  tipo!: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdUser(id);  
    
  }

  findByIdUser(id: number) {

    this.auth
    .getByIdUser(id)
    .subscribe((resp: User) => {

      this.getUser = resp;

      if (resp.tipo == "ADMINISTRADOR") {

        for (let i = 0; i < resp.proprietario.length; i++) {
       
          this.nomeUser = resp.proprietario[i].nome;            
        }
          
      }
      else {

        for (let i = 0; i < resp.responsavel.length; i++) {
       
          this.nomeUser = resp.responsavel[i].nome;
        }

      }    

    });

  }
  

}
