import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAnuncio } from 'app/model/IAnuncio.model';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  private API = 'http://localhost:8080/anuncios';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  buscarTodos(): Observable<IAnuncio[]>{
    return this.http.get<IAnuncio[]>(this.API)
  }

  exibirMensagem(titulo: string, mensagem: string, tipo: string): void{
    this.toastr.show(mensagem,titulo,{closeButton:true, progressBar:true}, tipo);
  }

  exibirErro(e: any): Observable<any>{
    this.exibirMensagem('Erro!!!', 'Não foi possivel realizar a operação', 'toast-error');
    return EMPTY;
  }

  excluir(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API}/${id}`).pipe(map(retorno => retorno),
    catchError(erro=> this.exibirErro(erro)))
  }

}
