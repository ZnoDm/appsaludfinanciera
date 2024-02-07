import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { MetaService } from 'src/app/services/meta/meta.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { AgregarPage } from '../agregar/agregar.page';
import { SaveUpdateCuentaPage } from '../save-update-cuenta/save-update-cuenta.page';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  @Input() cuenta: any = null;
  array_historia: any = [];
  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private metaService:MetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private cuentaService: CuentaService
  ) { }

  ngOnInit() {
    this.getHistoriaCuentaByPerson(this.cuenta.id)
  }

  async getHistoriaCuentaByPerson(idCuenta:number){
    const getHistoriaCuentaByPerson = await this.cuentaService.getHistoriaCuentaByPerson(+idCuenta);

    getHistoriaCuentaByPerson.subscribe({
      next: async (resp: any) => {
        console.log(resp)
        this.chgRef.markForCheck();
        this.array_historia = resp;
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }
  cerrarModal(){
    this.modalController.dismiss(null);
  }
  editarCuenta(item){
    console.log(item)
    this.modalController.create({
      component: SaveUpdateCuentaPage,
      componentProps: {cuenta : item}
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        console.log(data,role)
      });

  }
}
