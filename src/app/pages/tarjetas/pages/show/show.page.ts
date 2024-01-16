import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Observable, finalize } from 'rxjs';
import { TarjetaService } from 'src/app/services/tarjeta/tarjetas.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
  providers: [ DatePipe]
})
export class ShowPage implements OnInit {


  filterGroup: FormGroup;

  array_anios: any = [
    { value: 2024, nombre: 2024 },
  ];
  array_periodo:any = []
  array_calendario: any = [];

  tarjeta:any = null;
  periodoActual:any = {}
  periodoSiguiente:any = {};
  fechaActual: any;


  isLoading$: Observable<boolean>;
  constructor(
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private tarjetaService:TarjetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
  ) {
    this.isLoading$ = this.tarjetaService.isLoading$;
    this.tarjeta = this.activateRoute.snapshot.params;
    console.log(this.activateRoute.snapshot.params)
   }

  ngOnInit() {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.filterInit();
    this.getAniosByTarjeta(+this.tarjeta.idTarjetaCredito);
  }


  filterInit(){
    this.filterGroup = this.fb.group({
      Anio: [null]
    });
  }

  getFilter(event){
    const valor = event.detail.value;
    this.getPeriodosByTarjeta(+this.tarjeta.idTarjetaCredito,valor)
  }

  async getAniosByTarjeta(idTarjeta:number) {
    const getAniosByTarjeta = await this.tarjetaService.getAniosByTarjeta(idTarjeta);

    getAniosByTarjeta.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.array_anios = resp;
        const yearObject = resp.find(year => year.current === true);

        // Verifica si se encontró un objeto antes de acceder a su propiedad value
        const selectedYear = yearObject ? yearObject.value : 2024;
        this.filterGroup.controls['Anio'].setValue(selectedYear);
        this.getPeriodosByTarjeta(+this.tarjeta.idTarjetaCredito,selectedYear)
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }
  async getPeriodosByTarjeta(idTarjeta:number,anio:number) {
    const getPeriodosByTarjeta = await this.tarjetaService.getPeriodosByTarjeta(idTarjeta,anio);
    getPeriodosByTarjeta
    .pipe(finalize(()=>{this.getCronogramaByTarjeta(+this.tarjeta.idTarjetaCredito,this.periodoActual.anio,this.periodoActual.mes)}))
    .subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.array_periodo = resp;
        this.periodoActual = {};

        let indexPeriodoActual = -1;
        for (let index = 0; index < this.array_periodo.length; index++) {
          if(this.array_periodo[index].estado === '0002'){
            indexPeriodoActual = index;
            break;
          }
        }

        if (indexPeriodoActual != -1){
          this.periodoActual = this.array_periodo[indexPeriodoActual];
        }else{
          if(this.array_periodo[this.array_periodo.length-1].estado  === '0001'){
            this.periodoActual = this.array_periodo[this.array_periodo.length-1];
          }else{
            this.periodoActual = this.array_periodo[0];
          }
        }

        let fechaFac = new Date(this.periodoActual.fechaFacturacion);
        this.periodoSiguiente = {
          periodo: Number(this.periodoActual.mes) + 1 <=12?Number(this.periodoActual.mes) + 1:1 ,
          fechaDesde:  fechaFac.setDate(fechaFac.getDate()+1),
          fechaHasta : this.periodoActual.fechaFacturacionSiguiente,
        };

        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }
  async getCronogramaByTarjeta(idTarjeta:number,anio:number,mes:number){
    const getCronogramaByTarjeta = await this.tarjetaService.getCronogramaByTarjeta(+idTarjeta,+anio,+mes);
    getCronogramaByTarjeta.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.array_calendario = resp;
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }

  changePeriodo(periodo){
    if(periodo.estado !== '0003'){
      this.periodoActual = periodo;
      let fechaFac = new Date(this.periodoActual.fechaFacturacion);
      this.periodoSiguiente = {
        periodo: Number(this.periodoActual.mes) + 1 <=12?Number(this.periodoActual.mes) + 1:1 ,
        fechaDesde:  fechaFac.setDate(fechaFac.getDate()+1),
        fechaHasta : this.periodoActual.fechaFacturacionSiguiente,
      };
      this.getCronogramaByTarjeta(+this.tarjeta.idTarjetaCredito,+this.periodoActual.anio,+this.periodoActual.mes);
    }else{
      return;
    }
  }

  getDiferenciaFechas(fechaInicio:string,fechaFin:string){
    let xfechaInicio = new Date(fechaInicio);
    let xfechaFin = new Date(fechaFin);
    return Number(Math.round((xfechaFin.getTime() - xfechaInicio.getTime())/ (1000*60*60*24)));
  }
}
