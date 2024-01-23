import { map } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonList, ModalController, NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TarjetaService } from 'src/app/services/tarjeta/tarjetas.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { SaveUpdateTarjetaPage } from './pages/save-update-tarjeta/save-update-tarjeta.page';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {

  // @ViewChild(IonList) ionList: IonList;


  filterGroup: FormGroup;

  array_estado: any = [
    { value: '0000', nombre:'Todos' },
    { value: '0001', nombre:'DÍAS DE CONSUMO' },
    { value: '0002', nombre:'AVISO PARA PAGAR' },
    { value: '0003', nombre:'DÍAS DE ATRASO' },
    { value: '0004', nombre:'CANCELADAS' },
  ];
  array_tarjetas:any = []
  array_tarjetasBase:any = []
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tarjetaService:TarjetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private modalController: ModalController,
    private alertController:AlertController
  ) {
    this.isLoading$ = this.tarjetaService.isLoading$;
  }

  ngOnInit() {
    this.filterInit();
    this.getTarjetasByPerson();
  }

  filterInit(){
    this.filterGroup = this.fb.group({
      Estado: [null]
    });
  }

  getFilter(event){
    const valor = event.detail.value;
    let newArray  = [];
    if(valor == '0000'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.isActive == true);
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else if(valor == '0001'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.estado == "0001" && elemento.isActive == true);
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else if(valor == '0002'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.estado == "0002"  && elemento.isActive == true);
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else if(valor == '0003'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.estado == "0003"  && elemento.isActive == true);
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else{
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.isActive == false);
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }

  }

  async getTarjetasByPerson() {
    const getTarjetasByPerson = await this.tarjetaService.getTarjetasByPerson();

    getTarjetasByPerson.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.array_tarjetasBase = resp;
        const newArray = this.array_tarjetasBase.filter((elemento) => elemento.isActive == true);
        this.array_tarjetas = newArray;

        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }

  onShow(tarjeta){
    this.router.navigate(['/main/tabs/tarjetas/show',tarjeta]);
  }


  addTarjeta() {
    this.modalController.create({
      component: SaveUpdateTarjetaPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        console.log(data,role)
        if(data != null && data.ok){
          this.getTarjetasByPerson();
          this.filterGroup.controls['Estado'].setValue('0000');
        }
      });
  }

  editTarjeta(tarjeta: any) {
    this.modalController.create({
      component: SaveUpdateTarjetaPage,
      componentProps: { tarjeta }
    })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        console.log(data,role)
        if(data != null && data.ok){
          this.getTarjetasByPerson();
          this.filterGroup.controls['Estado'].setValue('0000');
        }
      });
  }
  delete(tarjeta:any){
    this.alertController.create({
      header:'Eliminar',
      message: 'Esta seguro de eliminar por completo '+tarjeta.nombreTarjeta +'?',
      buttons:[ {
        text:'SI',
        handler: async ()=>{
          const enabledDisabled = await this.tarjetaService.delete(tarjeta.idTarjetaCredito);

          enabledDisabled.subscribe({
            next: async (resp: any) => {
              console.log(resp);
              await this.getTarjetasByPerson();
              this.filterGroup.controls['Estado'].setValue('0000');
              this.chgRef.markForCheck();
            },
            error: async (error) => {
              this.toastrService.alertaInformativa(error?.error?.message || error?.message);
              console.log(error);
            },
          });
        }
      },
      { text:'NO'}]
    }).then(alertEl=>alertEl.present());

  }
  async enabledDisabled(tarjeta:any,flagActive){
  this.alertController.create({
    header: flagActive == true ? 'Activar':'Cancelar',
    message: `Esta seguro de ${flagActive == true ? 'activar':'cancelar'} la tarjeta ' ${tarjeta.nombreTarjeta} ' ?`,
    buttons:[ {
      text:'SI',
      handler:async ()=>{
        const enabledDisabled = await this.tarjetaService.enabledDisabled(tarjeta.idTarjetaCredito);

        enabledDisabled.subscribe({
          next: async (resp: any) => {
            console.log(resp);
            await this.getTarjetasByPerson();
            this.filterGroup.controls['Estado'].setValue('0000');
            this.chgRef.markForCheck();
          },
          error: async (error) => {
            this.toastrService.alertaInformativa(error?.error?.message || error?.message);
            console.log(error);
          },
        });
      }
    },
    { text:'NO'}]
  }).then(alertEl=>alertEl.present());
  }


  skeletonOptions = Array(3).fill(null);

  // Función para calcular el ancho del esqueleto según el tipo de elemento
  skeletonWidth(type: string): string {
    switch (type) {
      case 'icon-only':
        return '30px'; // Puedes ajustar el ancho según tus necesidades
      case 'h3':
        return '80%'; // Puedes ajustar el ancho según tus necesidades
      case 'p':
        return '60%'; // Puedes ajustar el ancho según tus necesidades
      default:
        return '100%';
    }
  }
}
