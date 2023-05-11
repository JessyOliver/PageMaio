import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadCriancaComponent } from './cadastro-telas/cad-crianca/cad-crianca.component';
import { CadProprietarioComponent } from './cadastro-telas/cad-proprietario/cad-proprietario.component';
import { CadResponsavelComponent } from './cadastro-telas/cad-responsavel/cad-responsavel.component';
import { CadUserComponent } from './cadastro-telas/cad-user/cad-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { EditProprietarioComponent } from './paginas-logado/editar/edit-proprietario/edit-proprietario.component';
import { HomeLoggedComponent } from './paginas-logado/home-logged/home-logged.component';
import { MenuLoggedComponent } from './paginas-logado/menu-logged/menu-logged.component';
import { VisualizarResponsavelComponent } from './paginas-logado/visualizar/visualizar-responsavel/visualizar-responsavel.component';
import { CadSegResponsavelComponent } from './cadastro-telas/cad-seg-responsavel/cad-seg-responsavel.component';
import { VisualizarCriancaComponent } from './paginas-logado/visualizar/visualizar-crianca/visualizar-crianca.component';
import { CadPacoteComponent } from './cadastro-telas/cad-pacote/cad-pacote.component';
import { VisualizarPacoteComponent } from './paginas-logado/visualizar/visualizar-pacote/visualizar-pacote.component';
import { CadReforcoComponent } from './cadastro-telas/cad-reforco/cad-reforco.component';
import { VisualizarReforcoComponent } from './paginas-logado/visualizar/visualizar-reforco/visualizar-reforco.component';
import { CadAgendaComponent } from './cadastro-telas/cad-agenda/cad-agenda.component';
import { PacoteCriancaComponent } from './paginas-logado/pacote-crianca/pacote-crianca.component';
import { EditResponsavelComponent } from './paginas-logado/editar/edit-responsavel/edit-responsavel.component';
import { EditPacoteComponent } from './paginas-logado/editar/edit-pacote/edit-pacote.component';
import { VisuEditResponsavelComponent } from './paginas-logado/visualizar/visu-edit-responsavel/visu-edit-responsavel.component';
import { VisuEditCriancaComponent } from './paginas-logado/visualizar/visu-edit-crianca/visu-edit-crianca.component';
import { VisuEditReforcoComponent } from './paginas-logado/visualizar/visu-edit-reforco/visu-edit-reforco.component';
import { EditReforcoComponent } from './paginas-logado/editar/edit-reforco/edit-reforco.component';
import { DetalhePacoteComponent } from './paginas-logado/detalhes/detalhe-pacote/detalhe-pacote.component';
import { DetalheReforcoComponent } from './paginas-logado/detalhes/detalhe-reforco/detalhe-reforco.component';
import { DetalheCriancaComponent } from './paginas-logado/detalhes/detalhe-crianca/detalhe-crianca.component';
import { EditCriancaComponent } from './paginas-logado/editar/edit-crianca/edit-crianca.component';
import { DetalhesResponsavelComponent } from './paginas-logado/detalhes/detalhes-responsavel/detalhes-responsavel.component';
import { VisualizarUsuarioComponent } from './paginas-logado/visualizar/visualizar-usuario/visualizar-usuario.component';
import { DetalheUsuarioComponent } from './paginas-logado/detalhes/detalhe-usuario/detalhe-usuario.component';
import { EditUsuarioComponent } from './paginas-logado/editar/edit-usuario/edit-usuario.component';
import { VisualizarProprietarioComponent } from './paginas-logado/visualizar/visualizar-proprietario/visualizar-proprietario.component';
import { DetalheProprietarioComponent } from './paginas-logado/detalhes/detalhe-proprietario/detalhe-proprietario.component';
import { EditProprietarioUnicComponent } from './paginas-logado/editar/edit-proprietario-unic/edit-proprietario-unic.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'menu', component: MenuComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: HomeLoggedComponent},
  {path: 'menuon', component: MenuLoggedComponent},

  {path: 'cadusuario', component: CadUserComponent},
  {path: 'cadproprietario', component: CadProprietarioComponent},
  {path: 'cadresponsavel', component: CadResponsavelComponent},
  {path: 'cadsegresponsavel/:id', component: CadSegResponsavelComponent},
  {path: 'cadcrianca/:id', component: CadCriancaComponent},
  {path: 'cadpacote', component: CadPacoteComponent},
  {path: 'cadreforco', component: CadReforcoComponent},
  {path: 'cadagenda/:id', component: CadAgendaComponent},

  {path: 'editperfil/:id', component: EditProprietarioComponent},
  {path: 'editproprietario/:id', component: EditProprietarioUnicComponent},
  {path: 'editproprietario/:id', component: EditProprietarioComponent},
  {path: 'editresposavel/:id', component: EditResponsavelComponent},
  {path: 'editcrianca/:id', component: EditCriancaComponent},
  {path: 'editpacote/:id', component: EditPacoteComponent},
  {path: 'editreforco/:id', component: EditReforcoComponent},
  {path: 'editusuario/:id', component: EditUsuarioComponent},
  
  {path: 'visuresponsavel', component: VisualizarResponsavelComponent},
  {path: 'visucrianca', component: VisualizarCriancaComponent},
  {path: 'visupacote/:id', component: VisualizarPacoteComponent},
  {path: 'visupacote', component: VisualizarPacoteComponent},
  {path: 'visureforco/:id', component: VisualizarReforcoComponent},
  {path: 'visusuario', component: VisualizarUsuarioComponent},
  {path: 'visuproprietario', component: VisualizarProprietarioComponent},
  
  {path: 'visueditresponsavel', component: VisuEditResponsavelComponent},
  {path: 'visueditcrianca', component: VisuEditCriancaComponent},
  {path: 'visueditreforco', component: VisuEditReforcoComponent},
  
  {path: 'pacotecrianca', component: PacoteCriancaComponent},

  {path: 'detalhecrianca/:id', component: DetalheCriancaComponent},
  {path: 'detalhepacote/:id', component: DetalhePacoteComponent},
  {path: 'detalhereforco/:id', component: DetalheReforcoComponent},
  {path: 'detalheresponsavel/:id', component: DetalhesResponsavelComponent},
  {path: 'detalheusuario/:id', component: DetalheUsuarioComponent},
  {path: 'detalheproprietario/:id', component: DetalheProprietarioComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
