import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from '../../models/reserva';
import { User } from '../../models/user';

@Component({
  selector: 'app-reserva-consulta',
  templateUrl: './reserva-consulta.component.html',
  styleUrls: ['./reserva-consulta.component.css']
})
export class ReservaConsultaComponent implements OnInit {
  searchText: string;
  reservas: Reserva[];
  user: User;
  tipo: string;
  page = 1;
  pageSize =5;
  constructor(private reservaService: ReservaService) { }
  
  ngOnInit(){
    this.reservas = [];
    this.reservaService.get().subscribe(result =>{
      this.reservas = result;
     });
    this.actualizarListaSignal();
  }
 
  private actualizarListaSignal(){
    this.reservaService.signalRecived.subscribe((reserva: Reserva) => {
      this.reservas.push(reserva);
    });
  }

  obtenerUsuario() {
    var lista = JSON.parse(sessionStorage.getItem('Login'));
    if (lista != null) {
      this.user = lista;
      this.tipo = this.user.tipo;
    }
  } 
  

}
