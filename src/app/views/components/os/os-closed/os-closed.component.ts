import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OS } from '../../../../models/os';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OsService } from '../../../../services/os.service';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrl: './os-closed.component.css'
})
export class OsClosedComponent implements AfterViewInit {

  lista: OS[] = [];

  displayedColumns: string[] = [
    'tecnico', 'cliente',
    'dataAbertura', 'dataFechamento', 
    'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.status == "ENCERRADO"){
          this.lista.push(x)
        }
      });
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }  

  listarCliente(): void{
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

  listarTecnico(): void{
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }

  prioridade(x: any){
    if(x == 'BAIXA'){
      return 'baixa'
    }else if(x == 'MEDIA'){
      return 'media'
    }else {
      return 'alta'
    }
  }

}
