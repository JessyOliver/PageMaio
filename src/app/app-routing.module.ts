import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { DetalheCriancaComponent } from './paginas-logado/detalhes/detalhe-crianca/detalhe-crianca.component';
import { DetalhePacoteComponent } from './paginas-logado/detalhes/detalhe-pacote/detalhe-pacote.component';
import { DetalheProprietarioComponent } from './paginas-logado/detalhes/detalhe-proprietario/detalhe-proprietario.component';
import { DetalheReforcoComponent } from './paginas-logado/detalhes/detalhe-reforco/detalhe-reforco.component';
import { DetalheUsuarioComponent } from './paginas-logado/detalhes/detalhe-usuario/detalhe-usuario.component';
import { DetalhesResponsavelComponent } from './paginas-logado/detalhes/detalhes-responsavel/detalhes-responsavel.component';
import { EditCriancaComponent } from './paginas-logado/editar/edit-crianca/edit-crianca.component';
import { EditPacoteComponent } from './paginas-logado/editar/edit-pacote/edit-pacote.component';
import { EditProprietarioUnicComponent } from './paginas-logado/editar/edit-proprietario-unic/edit-proprietario-unic.component';
import { EditProprietarioComponent } from './paginas-logado/editar/edit-proprietario/edit-proprietario.component';
import { EditReforcoComponent } from './paginas-logado/editar/edit-reforco/edit-reforco.component';
import { EditResponsavelComponent } from './paginas-logado/editar/edit-responsavel/edit-responsavel.component';
import { EditUsuarioComponent } from './paginas-logado/editar/edit-usuario/edit-usuario.component';
import { HomeLoggedComponent } from './paginas-logado/home-logged/home-logged.component';
import { MenuLoggedComponent } from './paginas-logado/menu-logged/menu-logged.component';
import { PacoteCriancaComponent } from './paginas-logado/detalhes/pacote-crianca/pacote-crianca.component';
import { VisuEditCriancaComponent } from './paginas-logado/visualizar/visu-edit-crianca/visu-edit-crianca.component';
import { VisuEditReforcoComponent } from './paginas-logado/visualizar/visu-edit-reforco/visu-edit-reforco.component';
import { VisuEditResponsavelComponent } from './paginas-logado/visualizar/visu-edit-responsavel/visu-edit-responsavel.component';
import { VisuMensagensComponent } from './paginas-logado/visualizar/visu-mensagens/visu-mensagens.component';
import { VisualizarCriancaComponent } from './paginas-logado/visualizar/visualizar-crianca/visualizar-crianca.component';
import { VisualizarPacoteComponent } from './paginas-logado/visualizar/visualizar-pacote/visualizar-pacote.component';
import { VisualizarProprietarioComponent } from './paginas-logado/visualizar/visualizar-proprietario/visualizar-proprietario.component';
import { VisualizarReforcoComponent } from './paginas-logado/visualizar/visualizar-reforco/visualizar-reforco.component';
import { VisualizarResponsavelComponent } from './paginas-logado/visualizar/visualizar-responsavel/visualizar-responsavel.component';
import { VisualizarUsuarioComponent } from './paginas-logado/visualizar/visualizar-usuario/visualizar-usuario.component';
import { VisuSegundoResponsavelComponent } from './paginas-logado/visualizar/visu-segundo-responsavel/visu-segundo-responsavel.component';
import { DetalheSegundoResponsavelComponent } from './paginas-logado/detalhes/detalhe-segundo-responsavel/detalhe-segundo-responsavel.component';
import { EditSegundoResponsavelComponent } from './paginas-logado/editar/edit-segundo-responsavel/edit-segundo-responsavel.component';
import { SobreComponent } from './sobre/sobre.component';
import { VisuAgendaComponent } from './paginas-logado/visualizar/visu-agenda/visu-agenda.component';
import { DetalheAgendaComponent } from './paginas-logado/detalhes/detalhe-agenda/detalhe-agenda.component';
import { EditAgendaComponent } from './paginas-logado/editar/edit-agenda/edit-agenda.component';
import { VisuCriancasResponsavelComponent } from './paginas-logado/visualizar/visu-criancas-responsavel/visu-criancas-responsavel.component';
import { VisuSegundoresponsavelResponsavelComponent } from './paginas-logado/visualizar/visu-segundoresponsavel-responsavel/visu-segundoresponsavel-responsavel.component';
import { EditPerfilResponsavelComponent } from './paginas-logado/editar/edit-perfil-responsavel/edit-perfil-responsavel.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'menu', component: MenuComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sobre', component: SobreComponent},
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
  {path: 'editperfilresponsavel/:id', component: EditPerfilResponsavelComponent},
  
  {path: 'editproprietario/:id', component: EditProprietarioUnicComponent},
  {path: 'editproprietario/:id', component: EditProprietarioComponent},
  {path: 'editresposavel/:id', component: EditResponsavelComponent},
  {path: 'editcrianca/:id', component: EditCriancaComponent},
  {path: 'editpacote/:id', component: EditPacoteComponent},
  {path: 'editreforco/:id', component: EditReforcoComponent},
  {path: 'editusuario/:id', component: EditUsuarioComponent},
  {path: 'editsegresponsavel/:id', component: EditSegundoResponsavelComponent},
  {path: 'editagenda/:id', component: EditAgendaComponent},
  
  {path: 'visuresponsavel', component: VisualizarResponsavelComponent},
  {path: 'visucrianca', component: VisualizarCriancaComponent},
  {path: 'visupacote/:id', component: VisualizarPacoteComponent},
  {path: 'visupacote', component: VisualizarPacoteComponent},
  {path: 'visureforco/:id', component: VisualizarReforcoComponent},
  {path: 'visusuario', component: VisualizarUsuarioComponent},
  {path: 'visuproprietario', component: VisualizarProprietarioComponent},
  {path: 'visumensagens', component: VisuMensagensComponent},
  {path: 'visusegundoresponsavel', component: VisuSegundoResponsavelComponent},
  {path: 'visuagenda', component: VisuAgendaComponent},
  {path: 'visucriancasresponsaveis/:id', component: VisuCriancasResponsavelComponent},
  {path: 'visusegresponsdresponsa/:id', component: VisuSegundoresponsavelResponsavelComponent},
  
  {path: 'visueditresponsavel', component: VisuEditResponsavelComponent},
  {path: 'visueditcrianca', component: VisuEditCriancaComponent},
  {path: 'visueditreforco', component: VisuEditReforcoComponent},
  
  {path: 'pacotecrianca/:id', component: PacoteCriancaComponent},

  {path: 'detalhecrianca/:id', component: DetalheCriancaComponent},
  {path: 'detalhepacote/:id', component: DetalhePacoteComponent},
  {path: 'detalhereforco/:id', component: DetalheReforcoComponent},
  {path: 'detalheresponsavel/:id', component: DetalhesResponsavelComponent},
  {path: 'detalheusuario/:id', component: DetalheUsuarioComponent},
  {path: 'detalheproprietario/:id', component: DetalheProprietarioComponent},
  {path: 'detalhesegresponsavel/:id', component: DetalheSegundoResponsavelComponent},
  {path: 'detalheagenda/:id', component: DetalheAgendaComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
