import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { Validacoes } from '../validacoes';
import { z } from "zod";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isCPF, isCNPJ } from 'brazilian-values';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})



export class PaginaLoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private builder: FormBuilder) {
    this.loginForm = builder.group({
      login: ['', Validators.required], // Modifiquei para um campo vazio, para aceitar CPF/CNPJ/Email
      senha: ['', Validators.required]
    });
  }

  login() {
    const loginValue = this.loginForm.get('login')?.value;
    if (isCPF(loginValue)) {
      console.log(this.loginForm.value);
      window.location.href = '/logada';
    } 
    
    if (Validacoes.isEmail(loginValue)) {
      window.location.href = '/logada';
    } else {
      this.errorMessage = 'Por favor, insira um e-mail ou CPF válido.';
    }

    return null; // Você pode ajustar o retorno conforme a lógica desejada
}
}
