import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAnuncio } from 'app/model/IAnuncio.model';
import { anuncioResponde } from 'app/model/anuncioResponde.model';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  private API = 'http://localhost:8080/anuncios';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<anuncioResponde>{
    return this.http.get<anuncioResponde>(this.API)
  }

  exibirMensagem(titulo: string, mensagem: string, tipo: string): void{
   // this.toastr.show(mensagem,titulo,{closeButton:true, progressBar:true}, tipo);
   alert(mensagem);
  }

  exibirErro(e: any): Observable<any>{
    this.exibirMensagem('Erro!!!', 'Não foi possivel realizar a operação', 'toast-error');
    return EMPTY;
  }

  exlcusaoL(id: number): Observable<any>{
    return this.http.patch<any>(`${this.API}/${id}`, null).pipe(map(retorno=>retorno),
    catchError(erro=> this.exibirErro(erro)))
  }

  excluir(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API}/${id}`).pipe(map(retorno => retorno),
    catchError(erro=> this.exibirErro(erro)))
  }

}
