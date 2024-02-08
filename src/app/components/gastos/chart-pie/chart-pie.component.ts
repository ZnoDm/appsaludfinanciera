
import {Component, ViewChild, type OnInit, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Chart , registerables } from 'chart.js';
import { CuentaService } from '../../../services/cuenta/cuenta.service';
import { ToastrService } from 'src/app/services/toastr.service';
@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
  @Input() resumen: any = null;

  ngAfterViewInit(){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getGraficoDonaResumen();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resumen'] && !changes['resumen'].firstChange) {
      this.getGraficoDonaResumen();
    }
  }

  constructor(
    private cuentaService:CuentaService,
    private toastrService:ToastrService
  ){}

  backgroundColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 0, 0, 0.5)',
    'rgba(0, 255, 0, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(128, 128, 128, 0.5)'
  ];
  labelsCategorias: string[] = null;
  datasetCategorias : number[] = null;

  @ViewChild('donaCanvas') donaCanvas: ElementRef | undefined;
  donaChart: any;


  donaChartMethod() {
    if (this.donaChart) {
      this.donaChart.destroy(); // Destruye el gráfico anterior si existe
    }
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.donaChart = new Chart(this.donaCanvas?.nativeElement, {
      type: "doughnut",
      data: {
        labels: this.labelsCategorias,
        datasets: [{
          label: 'Monto gastado',
          data: this.datasetCategorias,
          backgroundColor: this.backgroundColors.slice(3),
          hoverOffset: 4
        }]
      },
      options: {

      }
    });
  }

  async getGraficoDonaResumen(){
    const addGasto = await this.cuentaService.getGraficoDonaResumen();

    addGasto.subscribe({
      next: async (resp: any) => {
        console.log(resp)
        this.labelsCategorias = resp.map(item => item.nombre);
        console.log( this.labelsCategorias)
        this.datasetCategorias = resp.map(item => item.suma_montos);
        this.donaChartMethod();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
      },
    });
  }
}
