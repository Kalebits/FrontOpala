import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from 'app/model/ILogin.model';
import { IUsuario } from 'app/model/IUsuario.model';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  cadastrarUsuario(usuario: IUsuario): Observable<IUsuario>{
    return this.http.post<IUsuario>(this.API, usuario).pipe(
      map(retorno=> {retorno
      return true;}),
       catchError(erro => this.exibirErro(erro)))
  }

  exibirMensagem(titulo: string, mensagem: string, tipo: string): void{
    this.toastr.show(mensagem,titulo,{closeButton:true, progressBar:true}, tipo);
  }

  exibirErro(e: any): Observable<any>{
    this.exibirMensagem('Erro!!!', 'Não foi possivel realizar a operação', 'toast-error');
    return EMPTY;
  }

  exibirErroLogin(e: any): Observable<any>{
    this.exibirMensagem('Erro!', 'Não foi possivel encontrar tal combinação de E-Mail/CPF e senha', 'toast-error');
    return EMPTY;
  }

  logarUsuario(usuario: ILogin): Observable<ILogin>{
    
    return this.http.post<any>(`${this.API}/login`, usuario).pipe(
      tap(retorno => {
        retorno;
        return true;
      }),
      catchError(erro => this.exibirErroLogin(erro)))
    
  }


}
