import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../../../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrl: './cliente-read.component.css'
})

export class ClienteReadComponent implements AfterViewInit {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.clientes = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['clientes/create'])
  }

}
