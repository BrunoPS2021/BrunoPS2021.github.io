import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from '../../../../models/tecnico';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrl: './tecnico-read.component.css'
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: TecnicoService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['tecnicos/create'])
  }

}