import { ReservaService } from 'src/app/services/reserva.service';
import { Component, OnInit } from '@angular/core';
import { Reserva } from '../models/reserva';

@Component({
  selector: 'app-reserva-consulta-cliente',
  templateUrl: './reserva-consulta-cliente.component.html',
  styleUrls: ['./reserva-consulta-cliente.component.css']
})
export class ReservaConsultaClienteComponent implements OnInit {
  reservas: Reserva[];
  reserva: Reserva;
  public a: string;
  page = 1;
  pageSize =5;
  constructor(private reservaService: ReservaService) { }

  ngOnInit(){
    this.reservas = [];
  }
  BuscarCedula(){
    this.reservaService.getId(this.a).subscribe(result =>{
      this.reservas = result;
     });
     
  }
  
  
}
