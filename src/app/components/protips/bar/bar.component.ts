
import {Component, ViewChild, type OnInit, ElementRef } from '@angular/core';
import { Chart , registerables } from 'chart.js';
import { CuentaService } from '../../../services/cuenta/cuenta.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { MachineService } from '../../../services/machine.service';
import { format } from 'util';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [ DatePipe ]
})
export class BarComponent implements OnInit {

  ngAfterViewInit(){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getGraficoBar();
  }

  constructor(
    private machineService:MachineService,
    private toastrService:ToastrService,
    private datePipe: DatePipe,
  ){}
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  historialBar: any;

  generarFechasMes(año, mes) {
    const primerDiaMes = new Date(año, mes - 1, 1); // mes - 1 porque en JavaScript los meses van de 0 a 11
    const ultimoDiaMes = new Date(año, mes, 0);

    const fechas = [];
    for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
        const fecha = new Date(año, mes - 1, dia); // mes - 1 porque en JavaScript los meses van de 0 a 11
        const fechaFormateada =  this.datePipe.transform(fecha, 'dd-MM');
        fechas.push(fechaFormateada);
    }

    return fechas;
}

  historialBarMethod(labels,dataset1,dataset2) {

    this.historialBar = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data:{
        labels: labels,
        datasets:  [
          {
            label: 'MES ACTUAL',
            data: dataset1,
            backgroundColor:'#36A2EB',
          },
          {
            label: 'MES SIGUEINTE',
            data: dataset2,
            backgroundColor: '#4BC0C0',
          },
        ]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'PROYECCION DE GASTOS POR CATEGORIA'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }

  async getGraficoBar(){
    const addGasto = await this.machineService.getGastosCategoria();

    addGasto.subscribe({
      next: async (datos : any) => {
        const futuroArray = Object.entries(datos.futuro[0]).map(([categoria, total_monto]) => ({
          categoria: categoria.replace('categoria_', ''),
          total_monto
        }));

        console.log(futuroArray);

        // Crear un mapa de categorías para acceder eficientemente a las categorías existentes en "actual"
        const actualMap = new Map(datos.actual.map(obj => [obj.categoria, obj]));

        // Iterar sobre "futuro" y llenar las categorías faltantes en "actual" con un total de monto de 0
        futuroArray.forEach(obj => {
            if (!actualMap.has(obj.categoria)) {
                datos.actual.push({ categoria: obj.categoria, total_monto: 0 });
            }
        });
        console.log(datos.actual);
        const keys = datos.actual.map(obj => obj.categoria);
        const totalMontoActual = datos.actual.map(obj => obj.total_monto);
        const totalMontoFuturo = futuroArray.map(obj => obj.total_monto);
        this.historialBarMethod(keys,totalMontoActual,totalMontoFuturo);
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
      },
    });
  }
}
