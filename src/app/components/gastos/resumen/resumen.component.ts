
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
  @Input() resumen: any = null;

  // Obtener la fecha actual
  fechaActual: Date = new Date();

  // Calcular el último día del mes actual
  ultimoDiaDelMes: number = null;

  // Calcular los días restantes hasta el final del mes
  diasRestantes: number = null;

  ngOnInit(): void {
    this.ultimoDiaDelMes = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() + 1, 0).getDate();
    this.diasRestantes = this.ultimoDiaDelMes - this.fechaActual.getDate();
  }

}
