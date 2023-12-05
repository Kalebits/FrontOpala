import{HttpClient} from '@angular/common/http' 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private API = '//localhost:8080/Avaliacao'

  constructor(private http : HttpClient) { }

  listar() : Observable<any>{
    return this.http.get(this.API);
  }

  listarById(a:any) : Observable<any>{
    return this.http.get(this.API + '/' + a);
  }
}
