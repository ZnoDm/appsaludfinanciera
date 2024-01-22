import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController, IonModal, ModalController, PickerController, ActionSheetController } from '@ionic/angular';

import { Chart , registerables } from 'chart.js';
import { Router } from '@angular/router';
import { AgregarPage } from './pages/agregar/agregar.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SaveUpdateCuentaPage } from './pages/save-update-cuenta/save-update-cuenta.page';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit{
  usuario :any = null;
  selectedTab:string = 'cuentas';


  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;

  ngAfterViewInit(){
    Chart.register(...registerables);
    this.barChartMethod();
  }
  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: "bar",
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {

        }
      }
    });
  }

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
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getUser();
  }

  async getUser(){
    const user = await this.authService.getCurrentUserValue();
    console.log(user)
    this.usuario =  user;
  }

  async agregarGastoIngreso() {
    this.modalController.create({
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

  agregar() {
    this.modalController.create({
      component: SaveUpdateCuentaPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        if (role === 'creado') {
          // this.clienteService.ObtenerTodos().subscribe(
          //   (response: any) => {
          //     this.clientes = response;
          //   });
        }
      });

  }

  // editar(cliente: any) {
  //   this.modalCtrl.create({
  //     component: AgregarPage,
  //     componentProps: { cliente }
  //   })
  //     .then(modal => {
  //       modal.present();
  //       return modal.onDidDismiss();
  //     })
  //     .then(({ data, role }) => {
  //       this.clientes = this.clientes.filter((std:any) => {
  //         if (data.id === std.cliente_id) {
  //           return data;
  //         }
  //         return std;
  //       })
  //     });

  // }
}
