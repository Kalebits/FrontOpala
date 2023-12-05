import { NgModule } from '@angular/core';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { TelaArtistaComponent } from './tela-artista/tela-artista.component';

import { LogadaArtistaComponent } from './logada-artista/logada-artista.component';

const routes: Routes = [
  { path: '', component:PaginaInicialComponent },
  { path: 'cadastro', component:PaginaCadastroComponent },
  { path: 'login', component:PaginaLoginComponent },
  { path: 'perfil/:id', component:TelaArtistaComponent },
  { path: 'logada', component:LogadaArtistaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
