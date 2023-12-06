import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validacoes } from '../validacoes';
import { Router } from '@angular/router';
import { isCPF, isCNPJ, isPhone, formatToPhone } from 'brazilian-values';
import { z } from 'zod';
import  v8n  from 'v8n';
import { ReactiveFormsModule } from "@angular/forms";
import { UsuarioService } from 'app/service/usuario-.service';
import { IUsuario } from 'app/model/IUsuario.model';


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

  usuario: IUsuario ={
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    telefone: '',
    genero: ''
  };

  constructor(private router: Router, private builder: FormBuilder, private usuarioService: UsuarioService) {
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

  cadastrar(): void {
    const cadastroValue = this.cadastroForm.value;

    if(this.usuario.telefone != null && isPhone(formatToPhone(this.usuario.telefone))){
      this.errorMessageT = null;
      
        if (isCPF(this.usuario.cpf)) {
          this.usuarioService.cadastrarUsuario(this.usuario).subscribe(retorno => {
            this.usuario = retorno;
            if(retorno){
              window.location.href = '/logada';
            }
            this.usuarioService.exibirMensagem('Sistema', `${this.usuario.nome} foi cadastrado com sucesso. ID: ${this.usuario.id}`,
            'toast-success');
            
            // Lógica para lidar com a resposta do backend
          });
        
        }
        else{
          this.errorMessage = 'Por favor, insira um CPF válido.';
        }
      
     
    }
    else{
      this.errorMessageT = 'Por favor, insira um número de Celular válido.'
    } 
  }
}
