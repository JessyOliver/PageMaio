import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { CriancaService } from 'src/app/service/crianca.service';
import { PacoteService } from 'src/app/service/pacote.service';

@Component({
  selector: 'app-pacote-crianca',
  templateUrl: './pacote-crianca.component.html',
  styleUrls: ['./pacote-crianca.component.scss']
})
export class PacoteCriancaComponent implements OnInit{

  dataBr!: Date;


  constructor(
    private criancaService: CriancaService,
    private pacoteService: PacoteService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private formBuilder: FormBuilder

  ) {}


  ngOnInit(){}

  dataConvert(event: any){

    this.dataBr = event.target.value.split('/').reverse().join('-');
  }

}
