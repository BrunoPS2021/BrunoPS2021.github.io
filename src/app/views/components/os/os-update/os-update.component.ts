import { Component, OnInit } from '@angular/core';
import { OS } from '../../../../models/os';
import { Tecnico } from '../../../../models/tecnico';
import { Cliente } from '../../../../models/cliente';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';
import { OsService } from '../../../../services/os.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrl: './os-update.component.css'
})
export class OsUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id')
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
      this.converteDados();
    })
  }

  update(): void {
    this.service.update(this.os).subscribe(resposta => {
      this.service.message("Ordem de serviço atualizada com sucess!");
      this.router.navigate(['os'])
    })
  } 

  cancel(): void {
    this.router.navigate(['os'])
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  converteDados():void {
    if(this.os.status == "ABERTO"){
      this.os.status = 0;
    }else if(this.os.status == "ANDAMENTO"){
      this.os.status = 1;
    }else{
      this.os.status = 2;
    }

    if(this.os.prioridade == "BAIXA"){
      this.os.prioridade = 0;
    }else if(this.os.prioridade == "MEDIA"){
      this.os.prioridade = 1;
    }else{
      this.os.prioridade = 2;
    }
  }

}
