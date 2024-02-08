
import {Component, ViewChild, type OnInit, ElementRef } from '@angular/core';
import { Chart , registerables } from 'chart.js';
import { CuentaService } from '../../../services/cuenta/cuenta.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { MachineService } from '../../../services/machine.service';
import { format } from 'util';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-historial-bar',
  templateUrl: './historial-bar.component.html',
  styleUrls: ['./historial-bar.component.scss'],
  providers: [ DatePipe ]
})
export class HistorialBarComponent implements OnInit {

  ngAfterViewInit(){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getGraficoHistorialBar();
  }

  constructor(
    private machineService:MachineService,
    private toastrService:ToastrService,
    private datePipe: DatePipe,
  ){}
  labels = this.generarFechasMes(2024, 2);
  sumaGastosMesAnterior = 0;
  sumaGastosMesSiguiente = 0;

  @ViewChild('historialCanvas') historialCanvas: ElementRef | undefined;
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

  historialBarMethod(dataset1,dataset2) {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.historialBar = new Chart(this.historialCanvas?.nativeElement, {
      type: 'bar',
      data:{
        labels: this.labels,
        datasets: [
          {
            label: 'Mes pasado',
            data: dataset1,
            borderColor:  ['rgba(75, 192, 192, 0.5)'],
            backgroundColor: ['rgba(75, 192, 192, 0.5)'],
          },
          {
            label: 'Proyeccion mes siguiente',
            data: dataset2,
            borderColor: ['rgba(255, 159, 64, 0.5)'],
            backgroundColor: ['rgba(255, 159, 64, 0.5)'],
          }
        ]
      },
      options: {
        indexAxis: 'x',

        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        }
      },
    });
  }

  async getGraficoHistorialBar(){
    // const addGasto = await this.machineService.getGastosDiarios();

    // addGasto.subscribe({
    //   next: async (resp: any) => {
    //     console.log(resp)
    //     this.sumaGastosMesAnterior =  resp.gastos_originales.reduce((total, gasto) => total + gasto, 0);
    //     this.sumaGastosMesSiguiente =  resp.predicciones.reduce((total, gasto) => total + gasto, 0);
    //     this.historialBarMethod(resp.gastos_originales,resp.predicciones);
    //   },
    //   error: async (error) => {
    //     this.toastrService.alertaInformativa(error?.error?.message || error?.message);
    //   },
    // });
  }
}
