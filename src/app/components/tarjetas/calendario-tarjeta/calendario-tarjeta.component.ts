import { Component, Input, OnInit } from '@angular/core';

import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-calendario-tarjeta',
  templateUrl: './calendario-tarjeta.component.html',
  styleUrls: ['./calendario-tarjeta.component.scss'],
  providers: [ DatePipe ],
})
export class CalendarioTarjetaComponent implements OnInit {


  @Input() hoy: any;
  @Input() anio: string;

  /*DATOS IMPORTANTES PARA EL MES */
  @Input() calendario: any;
  /* @Input() fechaInicio: string; */
  /* @Input() fechaFin: string; */
  /* @Input() diaInicio: number; */

  mes:string;
  array_days: any = [
    { dia:1,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:2,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:3,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:4,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:5,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:6,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:7,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:8,clase:'day',inicia:false,fin:false,hoy:false},
    { dia:9,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:10,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:11,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:12,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:13,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:14,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:15,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:16,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:17,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:18,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:19,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:20,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:21,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:22,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:23,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:24,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:25,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:26,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:27,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:28,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:29,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:30,clase:'day',inicia:false,fin:false,hoy:false},
    {dia:31,clase:'day',inicia:false,fin:false,hoy:false},

  ]
  array_dias:any = [];
  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {

    /*LOGICA PARA CREAR CALENDARIO */
    let primerDiaMes = this.calendario.diaInicio==7?0:this.calendario.diaInicio;
    let ultimoDiaMes = Number(this.datePipe.transform(this.calendario.fechaFin, 'd'));

    this.array_days.splice(ultimoDiaMes, 6);
      for (let index = 0; index < primerDiaMes; index++) {
        this.array_days.unshift({
          dia:null,clase:'not-day',inicioConsumo:false,finConsumo:false,inicioRuleteo:false,finRuleteo:false,inicioAtraso:false,finAtraso:false
        });
      }
    while (this.array_days.length%7!==0) {
      this.array_days.push({
        dia:null,clase:'not-day',inicioConsumo:false,finConsumo:false,inicioRuleteo:false,finRuleteo:false,inicioAtraso:false,finAtraso:false
      });
    }


    /* LOGICA PARA PINTAR CONSUMO */
    let inicioConsumo = Number(this.datePipe.transform(this.calendario.inicioConsumo, 'd'));
    let finConsumo = Number(this.datePipe.transform(this.calendario.finConsumo, 'd'));

    if(inicioConsumo!==0){
      for (let index = (inicioConsumo + primerDiaMes - 1); index < (finConsumo+ primerDiaMes); index++) {
        this.array_days[index].clase='consumo';
      }
      this.array_days[inicioConsumo + primerDiaMes - 1].inicia=true;
      this.array_days[finConsumo+ primerDiaMes-1].fin=true;
    }




    /* LOGICA PARA PINTAR RULETEO */
    let inicioRuleteo = Number(this.datePipe.transform(this.calendario.inicioRuleteo, 'd'));
    let finRuleteo = Number(this.datePipe.transform(this.calendario.finRuleteo, 'd'));

    if(inicioRuleteo!==0){
      for (let index = (inicioRuleteo + primerDiaMes - 1); index < (finRuleteo+ primerDiaMes); index++) {
        this.array_days[index].clase='ruleteo';
      }
      this.array_days[inicioRuleteo + primerDiaMes - 1].inicia=true;
      this.array_days[finRuleteo+ primerDiaMes-1].fin=true;
    }




    /* LOGICA PARA PINTAR ATRASO */
    let atrasoInicio = Number(this.datePipe.transform(this.calendario.atrasoInicio, 'd'));
    let atrasoFin = Number(this.datePipe.transform(this.calendario.atrasoFin, 'd'));

    if(atrasoInicio!==0){
      for (let index = (atrasoInicio + primerDiaMes - 1); index < (atrasoFin+ primerDiaMes); index++) {
        this.array_days[index].clase='atraso';
      }
      this.array_days[atrasoInicio + primerDiaMes - 1].inicia=true;
      this.array_days[atrasoFin+ primerDiaMes-1].fin=true;
    }





    /* ULTIMO DIA PAGO */
    let ultimoDiaPago = Number(this.datePipe.transform(this.calendario.ultimoDiaPago, 'd'));
    if(ultimoDiaPago!==0){
        this.array_days[ultimoDiaPago+ primerDiaMes - 1].clase='ultimoDiaPago';
    }





    /* HOY */
    let anioHoy = Number(this.datePipe.transform(this.hoy, 'YYYY'));
    let mesHoy = Number(this.datePipe.transform(this.hoy, 'M'));
    let diaHoy = Number(this.datePipe.transform(this.hoy, 'd'));
    if(anioHoy === Number(this.anio) && mesHoy === this.calendario.mes){
      let claseHereda = this.array_days[diaHoy+ primerDiaMes - 1].clase
      this.array_days[diaHoy+ primerDiaMes - 1].clase= claseHereda+' hoy';
      this.array_days[diaHoy+ primerDiaMes - 1].hoy=true;
    }


    this.array_dias =  this.array_days;


  }

}
