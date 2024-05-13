import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent implements OnInit{

  id_cli = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

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

  delete(): void{
    this.service.delete(this.id_cli).subscribe((resposta) => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente deletado com sucesso!')
    }, err => {
      if(err.error.erros.match('possui ordens de serviço')){
        this.service.message(err.error.erros)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['clientes']);
  }

}
