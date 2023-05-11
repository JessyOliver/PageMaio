import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertsComponent } from './alerts/alerts.component';
import { HomeComponent } from './home/home.component';
import { CadProprietarioComponent } from './cadastro-telas/cad-proprietario/cad-proprietario.component';
import { CadCriancaComponent } from './cadastro-telas/cad-crianca/cad-crianca.component';
import { CadResponsavelComponent } from './cadastro-telas/cad-responsavel/cad-responsavel.component';
import { CadUserComponent } from './cadastro-telas/cad-user/cad-user.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeLoggedComponent } from './paginas-logado/home-logged/home-logged.component';
import { MenuLoggedComponent } from './paginas-logado/menu-logged/menu-logged.component';
import { EditProprietarioComponent } from './paginas-logado/editar/edit-proprietario/edit-proprietario.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { VisualizarResponsavelComponent } from './paginas-logado/visualizar/visualizar-responsavel/visualizar-responsavel.component';
import { CadSegResponsavelComponent } from './cadastro-telas/cad-seg-responsavel/cad-seg-responsavel.component';
import { VisualizarCriancaComponent } from './paginas-logado/visualizar/visualizar-crianca/visualizar-crianca.component';
import { CadPacoteComponent } from './cadastro-telas/cad-pacote/cad-pacote.component';
import { CadReforcoComponent } from './cadastro-telas/cad-reforco/cad-reforco.component';
import { CadAgendaComponent } from './cadastro-telas/cad-agenda/cad-agenda.component';

import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { VisualizarPacoteComponent } from './paginas-logado/visualizar/visualizar-pacote/visualizar-pacote.component';
import { VisualizarReforcoComponent } from './paginas-logado/visualizar/visualizar-reforco/visualizar-reforco.component';
import { PacoteCriancaComponent } from './paginas-logado/pacote-crianca/pacote-crianca.component';
import { EditResponsavelComponent } from './paginas-logado/editar/edit-responsavel/edit-responsavel.component';
import { EditPacoteComponent } from './paginas-logado/editar/edit-pacote/edit-pacote.component';
import { VisuEditResponsavelComponent } from './paginas-logado/visualizar/visu-edit-responsavel/visu-edit-responsavel.component';
import { VisuEditCriancaComponent } from './paginas-logado/visualizar/visu-edit-crianca/visu-edit-crianca.component';
import { VisuEditReforcoComponent } from './paginas-logado/visualizar/visu-edit-reforco/visu-edit-reforco.component';
import { EditReforcoComponent } from './paginas-logado/editar/edit-reforco/edit-reforco.component';
import { DetalhePacoteComponent } from './paginas-logado/detalhes/detalhe-pacote/detalhe-pacote.component';
import { DetalheCriancaComponent } from './paginas-logado/detalhes/detalhe-crianca/detalhe-crianca.component';
import { DetalheReforcoComponent } from './paginas-logado/detalhes/detalhe-reforco/detalhe-reforco.component';
import { EditCriancaComponent } from './paginas-logado/editar/edit-crianca/edit-crianca.component';
import { DetalhesResponsavelComponent } from './paginas-logado/detalhes/detalhes-responsavel/detalhes-responsavel.component';
import { VisualizarUsuarioComponent } from './paginas-logado/visualizar/visualizar-usuario/visualizar-usuario.component';
import { DetalheUsuarioComponent } from './paginas-logado/detalhes/detalhe-usuario/detalhe-usuario.component';
import { EditUsuarioComponent } from './paginas-logado/editar/edit-usuario/edit-usuario.component';
import { VisualizarProprietarioComponent } from './paginas-logado/visualizar/visualizar-proprietario/visualizar-proprietario.component';
import { DetalheProprietarioComponent } from './paginas-logado/detalhes/detalhe-proprietario/detalhe-proprietario.component';
import { EditProprietarioUnicComponent } from './paginas-logado/editar/edit-proprietario-unic/edit-proprietario-unic.component';


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
    EditProprietarioUnicComponent
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
