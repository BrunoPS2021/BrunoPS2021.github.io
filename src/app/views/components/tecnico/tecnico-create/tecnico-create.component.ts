import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from './../../../../models/tecnico';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router: Router,
    private service: TecnicoService
  ) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos']);
      this.service.message('Técnico criado com sucesso!');
    }, err => {
      if (err.error.erros.match('já cadastrado')) {
        this.service.message(err.error.erros);
      } else if (err.error.errors[0].message === 'invalid Brazilian individual taxpayer registry number (CPF)') {
        this.service.message("CPF inválido!");
      }
    })
  }

  errorValidName(){
    if(this.nome.invalid){
      return 'O nome deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidCpf(){
    if(this.cpf.invalid){
      return 'O CPF deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }

  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'O telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }
}
