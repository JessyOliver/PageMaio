import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadAgendaComponent } from './cadastro-telas/cad-agenda/cad-agenda.component';
import { CadCriancaComponent } from './cadastro-telas/cad-crianca/cad-crianca.component';
import { CadPacoteComponent } from './cadastro-telas/cad-pacote/cad-pacote.component';
import { CadProprietarioComponent } from './cadastro-telas/cad-proprietario/cad-proprietario.component';
import { CadReforcoComponent } from './cadastro-telas/cad-reforco/cad-reforco.component';
import { CadResponsavelComponent } from './cadastro-telas/cad-responsavel/cad-responsavel.component';
import { CadSegResponsavelComponent } from './cadastro-telas/cad-seg-responsavel/cad-seg-responsavel.component';
import { CadUserComponent } from './cadastro-telas/cad-user/cad-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { EditProprietarioComponent } from './paginas-logado/editar/edit-proprietario/edit-proprietario.component';
import { HomeLoggedComponent } from './paginas-logado/home-logged/home-logged.component';
import { MenuLoggedComponent } from './paginas-logado/menu-logged/menu-logged.component';
import { VisualizarCriancaComponent } from './paginas-logado/visualizar/visualizar-crianca/visualizar-crianca.component';
import { VisualizarResponsavelComponent } from './paginas-logado/visualizar/visualizar-responsavel/visualizar-responsavel.component';

import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { DetalheCriancaComponent } from './paginas-logado/detalhes/detalhe-crianca/detalhe-crianca.component';
import { DetalhePacoteComponent } from './paginas-logado/detalhes/detalhe-pacote/detalhe-pacote.component';
import { DetalheProprietarioComponent } from './paginas-logado/detalhes/detalhe-proprietario/detalhe-proprietario.component';
import { DetalheReforcoComponent } from './paginas-logado/detalhes/detalhe-reforco/detalhe-reforco.component';
import { DetalheUsuarioComponent } from './paginas-logado/detalhes/detalhe-usuario/detalhe-usuario.component';
import { DetalhesResponsavelComponent } from './paginas-logado/detalhes/detalhes-responsavel/detalhes-responsavel.component';
import { EditCriancaComponent } from './paginas-logado/editar/edit-crianca/edit-crianca.component';
import { EditPacoteComponent } from './paginas-logado/editar/edit-pacote/edit-pacote.component';
import { EditProprietarioUnicComponent } from './paginas-logado/editar/edit-proprietario-unic/edit-proprietario-unic.component';
import { EditReforcoComponent } from './paginas-logado/editar/edit-reforco/edit-reforco.component';
import { EditResponsavelComponent } from './paginas-logado/editar/edit-responsavel/edit-responsavel.component';
import { EditUsuarioComponent } from './paginas-logado/editar/edit-usuario/edit-usuario.component';
import { PacoteCriancaComponent } from './paginas-logado/detalhes/pacote-crianca/pacote-crianca.component';
import { VisuEditCriancaComponent } from './paginas-logado/visualizar/visu-edit-crianca/visu-edit-crianca.component';
import { VisuEditReforcoComponent } from './paginas-logado/visualizar/visu-edit-reforco/visu-edit-reforco.component';
import { VisuEditResponsavelComponent } from './paginas-logado/visualizar/visu-edit-responsavel/visu-edit-responsavel.component';
import { VisuMensagensComponent } from './paginas-logado/visualizar/visu-mensagens/visu-mensagens.component';
import { VisualizarPacoteComponent } from './paginas-logado/visualizar/visualizar-pacote/visualizar-pacote.component';
import { VisualizarProprietarioComponent } from './paginas-logado/visualizar/visualizar-proprietario/visualizar-proprietario.component';
import { VisualizarReforcoComponent } from './paginas-logado/visualizar/visualizar-reforco/visualizar-reforco.component';
import { VisualizarUsuarioComponent } from './paginas-logado/visualizar/visualizar-usuario/visualizar-usuario.component';
import { VisuSegundoResponsavelComponent } from './paginas-logado/visualizar/visu-segundo-responsavel/visu-segundo-responsavel.component';
import { DetalheSegundoResponsavelComponent } from './paginas-logado/detalhes/detalhe-segundo-responsavel/detalhe-segundo-responsavel.component';
import { EditSegundoResponsavelComponent } from './paginas-logado/editar/edit-segundo-responsavel/edit-segundo-responsavel.component';
import { SobreComponent } from './sobre/sobre.component';
import { VisuAgendaComponent } from './paginas-logado/visualizar/visu-agenda/visu-agenda.component';
import { FooterComponent } from './footer/footer.component';
import { DetalheAgendaComponent } from './paginas-logado/detalhes/detalhe-agenda/detalhe-agenda.component';
import { EditAgendaComponent } from './paginas-logado/editar/edit-agenda/edit-agenda.component';
import { VisuCriancasResponsavelComponent } from './paginas-logado/visualizar/visu-criancas-responsavel/visu-criancas-responsavel.component';
import { VisuSegundoresponsavelResponsavelComponent } from './paginas-logado/visualizar/visu-segundoresponsavel-responsavel/visu-segundoresponsavel-responsavel.component';


export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: 0,
  max: 99999,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent,
    HomeComponent,
    CadProprietarioComponent,
    CadCriancaComponent,
    CadResponsavelComponent,
    CadUserComponent,
    LoginComponent,
    MenuComponent,
    HomeLoggedComponent,
    MenuLoggedComponent,
    EditProprietarioComponent,
    VisualizarResponsavelComponent,
    CadSegResponsavelComponent,
    VisualizarCriancaComponent,
    CadPacoteComponent,
    CadReforcoComponent,
    CadAgendaComponent,
    VisualizarPacoteComponent,
    VisualizarReforcoComponent,
    PacoteCriancaComponent,
    EditResponsavelComponent,
    EditPacoteComponent,
    VisuEditResponsavelComponent,
    VisuEditCriancaComponent,
    VisuEditReforcoComponent,
    EditReforcoComponent,
    DetalhePacoteComponent,
    DetalheCriancaComponent,
    DetalheReforcoComponent,
    EditCriancaComponent,
    DetalhesResponsavelComponent,
    VisualizarUsuarioComponent,
    DetalheUsuarioComponent,
    EditUsuarioComponent,
    VisualizarProprietarioComponent,
    DetalheProprietarioComponent,
    EditProprietarioUnicComponent,
    VisuMensagensComponent,
    VisuSegundoResponsavelComponent,
    DetalheSegundoResponsavelComponent,
    EditSegundoResponsavelComponent,
    SobreComponent,
    VisuAgendaComponent,
    FooterComponent,
    DetalheAgendaComponent,
    EditAgendaComponent,
    VisuCriancasResponsavelComponent,
    VisuSegundoresponsavelResponsavelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy    
    },


],
  bootstrap: [AppComponent]
})
export class AppModule { }
