import { ChangeDetectorRef, Component,OnInit} from '@angular/core';
import { ModalController} from '@ionic/angular';


import { Router } from '@angular/router';
import { AgregarPage } from './pages/agregar/agregar.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SaveUpdateCuentaPage } from './pages/save-update-cuenta/save-update-cuenta.page';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { CuentaPage } from './pages/cuenta/cuenta.page';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit{

  usuario :any = null;
  resumen: any = {};
  array_cuentas = []
  constructor(
    private router: Router,
    private modalController: ModalController,
    private authService: AuthService,
    private cuentaService: CuentaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
  ) {}

  ionViewWillEnter() {
    this.getUser();
  }
  ngOnInit() {
    this.getCuentasListarByUser();
    this.getResumenGastoByPerson();
  }

  async getUser(){
    const user = await this.authService.getCurrentUserValue();
    console.log(user)
    this.usuario =  user;
  }

  async getResumenGastoByPerson(){
    const getResumenGastoByPerson = await this.cuentaService.getResumenGastoByPerson();

    getResumenGastoByPerson.subscribe({
      next: async (resp: any) => {
        console.log(resp[0])
        this.resumen = resp[0]
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }
  async getCuentasListarByUser(){
    const getCuentasListarByUser = await this.cuentaService.getCuentasListarByUser();

    getCuentasListarByUser.subscribe({
      next: async (resp: any) => {
        this.array_cuentas = resp;
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
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
        console.log(data,role)
        if(data.ok){
          this.getCuentasListarByUser()
        }
      });

  }

  showCuenta(item) {
    this.modalController.create({
      component: CuentaPage,
      componentProps: {cuenta : item}
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        console.log(data,role)
      });

  }


  async agregarGastoIngreso() {
    this.modalController.create({
      component: AgregarPage,
      componentProps: {array_cuentas: this.array_cuentas},
      breakpoints: [0, 0.9, 1],
      initialBreakpoint: 0.9,
      showBackdrop:true,
      mode: 'ios',
      handle: true
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data , role}) => {
        console.log(data, role)
        if(data.ok){
          this.getCuentasListarByUser()
          this.getResumenGastoByPerson()
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
