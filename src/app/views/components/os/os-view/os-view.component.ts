import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from '../../../../models/os';
import { OsService } from '../../../../services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrl: './os-view.component.css'
})
export class OsViewComponent implements OnInit{

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: OsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(): void{
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta
    })
  }

  return(): void{
    this.router.navigate(['os'])
  }

}
