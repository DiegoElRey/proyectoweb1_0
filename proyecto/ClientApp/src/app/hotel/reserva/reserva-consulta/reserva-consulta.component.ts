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
  estado: boolean;
  constructor(private reservaService: ReservaService) { }
  
  ngOnInit(){
    this.reservas = [];
    this.reservaService.get().subscribe(result =>{
      this.reservas = result;
     });
    this.actualizarListaSignal();
  }
 
  checkin(reserva: Reserva){
    reserva.habitacion.estado = "Ocupado";
    this.reservaService.put(reserva).subscribe(p =>{
        if(p != null){
          alert("Se realizó check in");
          this.estado = true;
        }
    });
  }
  checkout(reserva: Reserva){
    reserva.habitacion.estado = "desocupado";
    this.reservaService.put(reserva).subscribe(p =>{
        if(p != null){
          alert("Se realizó check out");
          this.estado = true;
        }
    });
  }
  private actualizarListaSignal(){
    this.reservaService.signalRecived.subscribe((reserva: Reserva) => {
      this.reservaService.get().subscribe(result =>{
        this.reservas = result;
       });
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
