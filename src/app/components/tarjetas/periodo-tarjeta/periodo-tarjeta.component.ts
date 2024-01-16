import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-periodo-tarjeta',
  templateUrl: './periodo-tarjeta.component.html',
  styleUrls: ['./periodo-tarjeta.component.scss']
})
export class PeriodoTarjetaComponent implements OnInit {

  @Input() periodo: any;
  @Input() periodoActual: any;

  constructor() { }

  ngOnInit() {
  }

}
