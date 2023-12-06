import { Component, OnInit } from '@angular/core';
import { IAnuncio } from 'app/model/IAnuncio.model';
import { AnuncioService } from 'app/service/anuncio.service';

@Component({
  selector: 'app-logada-artista',
  templateUrl: './logada-artista.component.html',
  styleUrls: ['./logada-artista.component.css']
})
export class LogadaArtistaComponent implements OnInit{
  listaAnun: IAnuncio[] = [];
  
  
  constructor(private anuncioService: AnuncioService) { }
  


  ngOnInit() {
    this.carregarAnuncios();
  }

  carregarAnuncios(): void{
    this.anuncioService.buscarTodos().subscribe(retorno =>{
      this.listaAnun = retorno;
    })
  }

  deletar(anuncio: IAnuncio): void{
      this.anuncioService.excluir(anuncio.id!).subscribe(()=>{
        this.anuncioService.exibirMensagem('Sistema', `Anuncio de ${anuncio.tipo} foi aceito com sucesso!`, 'toast-success');
        this.carregarAnuncios
      })
  }

}