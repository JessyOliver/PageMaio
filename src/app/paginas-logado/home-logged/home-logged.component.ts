import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensagem } from 'src/app/model/Mensagem';
import { Proprietario } from 'src/app/model/Proprietario';
import { Responsavel } from 'src/app/model/Responsavel';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { MensagensService } from 'src/app/service/mensagens.service';
import { ProprietarioService } from 'src/app/service/proprietario.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.scss']
})
export class HomeLoggedComponent implements OnInit{

  formulario!: FormGroup;

  listProprietario: Proprietario[] = [];
  proprietarioFK: Proprietario = new Proprietario();
  idProprietario!: number;

  responsavelFK: Responsavel = new Responsavel();
  idResponsavel = environment.id;
  idResponsavelget!: number;

  titulo!: string;
  conteudoMensagem!: string;
  proprietario!: string;

  cadMensagems: Mensagem = new Mensagem();


  constructor(   

    private mensagemService: MensagensService,
    private proprietarioService: ProprietarioService,
    private responsavelService: ResponsavelService,  
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public authService: AuthService

  ){}

  ngOnInit() {
    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.auth.refreshToken();

    this.formulario = this.formBuilder.group({

      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      conteudoMensagem: ['', [Validators.required, Validators.maxLength(250)]],
      proprietario: ['', [Validators.required]]

    });

    this.findByAllProprietario();
    this.findByAllResponavel();

  }

  //get all user Response<User[]>
  findByAllProprietario() {

      this.proprietarioService
      .getAllProprietario()
        .subscribe((resp: Proprietario[]) => {
        //  this.listUser = JSON.parse(JSON.stringify(resp));
          this.listProprietario = resp;
        });  


  }
  //get all user Response<User[]>
  findByAllResponavel() {

      this.authService
      .getByIdUser(this.idResponsavel)
        .subscribe((resp: User) => {

          for (let i = 0; i < resp.responsavel.length; i++) {
   
            if (resp.tipo == "PADRÃO") {
                
              this.idResponsavelget = resp.responsavel[i].id;
            }
   
          }
        });  

  }

  postMensages() {

    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {

        this.titulo = this.formulario.get('titulo')?.value;
        this.conteudoMensagem = this.formulario.get('conteudoMensagem')?.value;
       // this.proprietario = this.formulario.get('proprietario')?.value


        this.proprietarioFK.id = this.idProprietario;
        this.cadMensagems.proprietario = this.proprietarioFK;

        this.responsavelFK.id = this.idResponsavelget;
        this.cadMensagems.responsavel = this.responsavelFK;      

        this.cadMensagems.titulo = this.titulo;
        this.cadMensagems.conteudoMensagem = this.conteudoMensagem;

        this.mensagemService
        .postMensagem(this.cadMensagems)
        .subscribe((resp: Mensagem) => {

          this.cadMensagems = resp;
          
          this.alerts.showAlertSucess("Menagem enviada com sucesso!");

        }, 
        error => {

          if (error.status === 400) {
            
            this.alerts.showAlertDanger("Erro no envio da mensagem.");
          }
          if (error.status === 401) {
            
            this.alerts.showAlertDanger("Erro de autenticação, refaça login.");
            this.router.navigate(["/login"]);
          }
          if (error.status === 500) {
            
            this.alerts.showAlertDanger("Erro nos campos preenchidos.");
          }

        });
    
     }

  }


}
