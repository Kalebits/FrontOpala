import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { Validacoes } from '../validacoes';
import { z } from "zod";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isCPF, isCNPJ } from 'brazilian-values';
import { ILogin } from 'app/model/ILogin.model';
import { UsuarioService } from 'app/service/usuario-.service';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})



export class PaginaLoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  loginx: ILogin = {
    senha: '',
  };

  constructor(private builder: FormBuilder, private usuarioService: UsuarioService) {
    this.loginForm = builder.group({
      login: ['', Validators.required], // Modifiquei para um campo vazio, para aceitar CPF/CNPJ/Email
      senha: ['', Validators.required]
    });
  }

  login() {
    const loginValue = this.loginForm.get('login')?.value;

    if (isCPF(loginValue)) {
      this.loginx.cpf = loginValue;

      this.usuarioService.logarUsuario(this.loginx).subscribe(retorno => {
        if (retorno) {
          window.location.href = '/perfilM';
        }
      }
      );
    }
    else{
      this.loginx.email = loginValue;

      this.usuarioService.logarUsuario(this.loginx).subscribe(retorno => {
        if (retorno) {
          this.sendData.emit(retorno);
          window.location.href = '/perfilM';
        }
      });
    }
  }
}



