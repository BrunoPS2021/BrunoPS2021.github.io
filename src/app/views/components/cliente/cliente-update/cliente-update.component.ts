import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})
export class ClienteUpdateComponent implements OnInit{

  id_cli = ''

  cliente: Cliente = {
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
    private service: ClienteService,
    private route: ActivatedRoute){

    }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_cli).subscribe((resposta) => {
      this.cliente = resposta;
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente atualizado com sucesso!')
    }, err => {
      if (err.error.erros.match('já cadastrado')) {
        this.service.message(err.error.erros);
      } else if (err.error.errors[0].message === 'invalid Brazilian individual taxpayer registry number (CPF)') {
        this.service.message("CPF inválido!");
      }
    })
  }

  cancel(): void {
    this.router.navigate(['clientes']);
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
