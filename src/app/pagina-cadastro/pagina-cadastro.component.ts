import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validacoes } from '../validacoes';
import { Router } from '@angular/router';
import { isCPF, isCNPJ, isPhone, formatToPhone } from 'brazilian-values';
import { z } from 'zod';
import  v8n  from 'v8n';
import { ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'app-pagina-cadastro',
  templateUrl: './pagina-cadastro.component.html',
  styleUrls: ['./pagina-cadastro.component.css']
})
export class PaginaCadastroComponent {
  @ViewChild('senhaInput') senhaInputRef!: ElementRef;
  @ViewChild('confirmarSenhaInput') confirmarSenhaInputRef!: ElementRef;

  cadastroForm: FormGroup;
  errorMessage: string | null = null;
  errorMessageE: string | null = null;
  errorMessageT: string | null = null;
  errorMessageS: string | null = null;

  isSenhaVisivel: boolean = false;

  constructor(private router: Router, private builder: FormBuilder) {
    this.cadastroForm = builder.group({
      nome: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', Validators.required, Validacoes.isEmail],
      cpf: ['', Validators.required],
      tel: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      senha: ['', Validators.required],
      chkSenha: ['', Validators.required]
      
    });
    this.clearFormFields();
  }

  

  clearFormFields() {
    this.cadastroForm.patchValue({
      artista: null,
      nome: null,
      email: null,
      cpf: null,
      tel: null,
      senha: null,
      chkSenha: null,
      contratante: null,
      cnpj: null,
      cep: null
    });
  }

  mostrarSenha() {
    this.isSenhaVisivel = !this.isSenhaVisivel;
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
  
    if (senhaInput && confirmarSenhaInput) {
      senhaInput.setAttribute('type', this.isSenhaVisivel ? 'text' : 'password');
      confirmarSenhaInput.setAttribute('type', this.isSenhaVisivel ? 'text' : 'password');
    }
  }

  confirmaSenha(){
    const senha = this.cadastroForm.value.senha;
    const confirmarSenha = this.cadastroForm.value.chkSenha;

    if(senha == confirmarSenha){
      this.errorMessageS = '';
    }
    else{
      this.errorMessageS = "As senhas devem coincidir";
    }
  }

  cadastrar() {
    const cadastroValue = this.cadastroForm.value;

    if(cadastroValue.tel != null){
      if(isPhone(formatToPhone(cadastroValue.tel)))
      {
        if (isCPF(cadastroValue.cpf)) {
          console.log(this.cadastroForm.value)
          window.location.href = '/logada';
        }
        else{
          this.errorMessage = 'Por favor, insira um CPF válido.';
        }
      }
      else{
        this.errorMessageT = 'Por favor, insira um número de Celular válido.'
      }
    }
    else{
      this.errorMessageT = null;
    }

    if (isCPF(cadastroValue.cpf)) {
      console.log(this.cadastroForm.value)
      window.location.href = '/logada';
    }  
    else if(!isCPF(cadastroValue.cpf)){
      this.errorMessage = 'Por favor, insira um CPF válido.';
    }
    else{
      this.errorMessage = null;
    }

    
     
  }
}
