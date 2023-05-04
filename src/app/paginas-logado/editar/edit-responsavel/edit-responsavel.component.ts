import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsavel } from 'src/app/model/Responsavel';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { ResponsavelService } from 'src/app/service/responsavel.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-responsavel',
  templateUrl: './edit-responsavel.component.html',
  styleUrls: ['./edit-responsavel.component.scss']
})
export class EditResponsavelComponent {

  //ALTERANDO RESPONSÁVEL
  editResponsavel: Responsavel = new Responsavel();

  dataBr!: Date;
  gen!: string;

  confirmeSenha!: string;
  typeUser!: string;

  constructor(
    private authService: AuthService,
    private responsavelService: ResponsavelService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
  ) {}


  ngOnInit(){

    window.scroll(0,0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    //forçando altenticação
    this.authService.refreshToken();

    let id = this.route.snapshot.params['id'];
    this.findByIdResponsavel(id);

  }

  findByIdResponsavel(id: number) {

    this.responsavelService
    .getById(id)
    .subscribe((resp: Responsavel) => {

      this.editResponsavel = resp;
    });
    
  }

  dataConvert(event: any){

    this.dataBr = event.target.value.split('/').reverse().join('-');
  }  

  updateResponsavel() {

    console.log("Data ",this.dataBr)
    
    this.editResponsavel.dtNascimento = this.dataBr;

    this.responsavelService
    .updateResponsavel(this.editResponsavel)
    .subscribe((resp: Responsavel) => {

      this.editResponsavel = resp;
      this.router.navigate(["/inicio"]);
      this.alerts.showAlertInfo("Responsável editado com sucesso.");

    },
    error => {
      if (error.status === 400) {

        this.alerts.showAlertInfo("Erro na alteração.");
      }
    });

  }


  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  togglePass() {

    let senha = <HTMLInputElement>document.getElementById("senha");

    if (senha.type == "password") {
      senha.type = "text";
      document.getElementById('pass')!.style.display = 'none';
      document.getElementById('text')!.style.display = 'inline-block';
    }
    else {
      senha.type = "password";
      document.getElementById('text')!.style.display = 'none';
      document.getElementById('pass')!.style.display = 'inline-block';
    }

  }

  togglePass2() {

      ///////////CAMPO CONFIRMAÇÃO DE SENHA

      let tipoConfirma = <HTMLInputElement>document.getElementById("confirmSenha");

      if (tipoConfirma.type == "password") {
        tipoConfirma.type = "text";
        document.getElementById('pass2')!.style.display = 'none';
        document.getElementById('text2')!.style.display = 'inline-block';
      }
      else {
        tipoConfirma.type = "password";
        document.getElementById('text2')!.style.display = 'none';
        document.getElementById('pass2')!.style.display = 'inline-block';
      }

  }
  
  tipoUser(event: any){
    this.typeUser = event.target.value
  }




}
