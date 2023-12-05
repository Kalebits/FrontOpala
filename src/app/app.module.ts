import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';
import { TelaArtistaComponent } from './tela-artista/tela-artista.component';
import { LogadaArtistaComponent } from './logada-artista/logada-artista.component';
import { AppRoutingModule } from './app-routing.module';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';




@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    PaginaLoginComponent,
    PaginaCadastroComponent,
    TelaArtistaComponent,
    LogadaArtistaComponent,
    TelaPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
