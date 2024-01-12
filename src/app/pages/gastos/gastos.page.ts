import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController, IonModal, ModalController, PickerController } from '@ionic/angular';
import { HeaderPeriodoComponent } from 'src/app/components/header-periodo/header-periodo.component';

import { Chart , registerables } from 'chart.js';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit{
  array_cuentas = [
    { nombre : 'Cuenta A',
      gasto : 1200.12
    },
    {
      nombre : 'Cuenta B',
      gasto : 100
    }
  ]

  constructor(
  ) {}

  ngOnInit() {
  }
}
