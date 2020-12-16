import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado-consulta',
  templateUrl: './empleado-consulta.component.html',
  styleUrls: ['./empleado-consulta.component.css']
})
export class EmpleadoConsultaComponent implements OnInit {
  empleados: Empleado[];
  searchText: string;
  page = 1;
  pageSize =5;
  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(){
    this.empleadoService.get().subscribe(result => {
      this.empleados = result;
      });
  }

    /*Ordenar en la tabla*/

    sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        }
        else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
}
