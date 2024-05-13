import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/tecnico';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { OS } from '../../../../models/os';
import { OsService } from '../../../../services/os.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrl: './os-create.component.css'
})
export class OsCreateComponent implements OnInit{

  selected = '';

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }
  
  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.listarTecnicos();
     this.listarClientes();
  }

  create(): void {
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem de serviço criada com sucess!");
      this.router.navigate(['os'])
    })
  }

  cancel():void{
    this.router.navigate(['os'])
  }

  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes():void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

}
