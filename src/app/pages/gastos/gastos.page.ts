import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController, IonModal, ModalController, PickerController, ActionSheetController } from '@ionic/angular';
import { HeaderPeriodoComponent } from 'src/app/components/header-periodo/header-periodo.component';

import { Chart , registerables } from 'chart.js';
import { Router } from '@angular/router';
import { AgregarPage } from './pages/agregar/agregar.page';
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
    private router: Router,
    private modalCtrl: ModalController,
    // private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
     this.modalCtrl.create({
      component: AgregarPage,
      breakpoints: [0, 0.9, 1],
      initialBreakpoint: 0.9,
      showBackdrop:true,
      mode: 'ios',
      handle: true
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data}) => {
        console.log(data)
      });
  }

  async agregar() {
    // this.modalCtrl.create({
    //   component: AgregarPage,
    //   breakpoints: [0, 0.9, 1],
    //   initialBreakpoint: 0.9,
    //   showBackdrop:true,
    //   mode: 'ios',
    //   handle: true
    // }).then(modal => {
    //   modal.present();
    //   return modal.onDidDismiss();
    // })
    //   .then(({ data}) => {
    //     console.log(data)
    //   });

  }
}
