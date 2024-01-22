import { Component,OnInit} from '@angular/core';
import { ModalController} from '@ionic/angular';


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
    this.getUser();
  }

  // ionViewWillEnter() {
  //   this.getUser();
  // }

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

  addCuenta() {
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
