import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../../../services/toastr.service';
import { TarjetaService } from 'src/app/services/tarjeta/tarjetas.service';
import { Observable } from 'rxjs';
import { BancoService } from 'src/app/services/banco/banco.service';
import { TipoTarjetaService } from '../../../../services/tipo-tarjeta/tipo-tarjeta.service';
import { ProveedorTarjetaService } from 'src/app/services/proveedor-tarjeta/proveedor-tarjeta.service';
import { TipoCierreService } from 'src/app/services/tipo-cierre/tipo-cierre.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-save-update-tarjeta',
  templateUrl: './save-update-tarjeta.page.html',
  styleUrls: ['./save-update-tarjeta.page.scss'],
})
export class SaveUpdateTarjetaPage implements OnInit {
  @Input() tarjeta : any = null
  array_banco: any = [];
  array_proveedorTarjeta: any = [];
  array_tipoTarjeta: any = [];
  array_tipoCierre: any = [];


  tarjetaForm: FormGroup;

  isLoading$: Observable<boolean>;
  isLoadingBanco$: Observable<boolean>;
  isLoadingProveedorTarjeta$: Observable<boolean>;
  isLoadingTipoTarjeta$: Observable<boolean>;
  isLoadingTipoCierre$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private bancoService:BancoService,
    private proveedorTarjetaService:ProveedorTarjetaService,
    private tipoTarjetaService:TipoTarjetaService,
    private tarjetaService:TarjetaService,
    private tipoCierreService:TipoCierreService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private loadingController: LoadingController
  ) {
    this.isLoading$ = this.tarjetaService.isLoading$;
    this.isLoadingBanco$ = this.bancoService.isLoading$;
    this.isLoadingProveedorTarjeta$ = this.proveedorTarjetaService.isLoading$;
    this.isLoadingTipoTarjeta$ = this.tipoTarjetaService.isLoading$;
    this.isLoadingTipoCierre$ = this.tipoCierreService.isLoading$;
   }
   async showLoading(duracion) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: duracion,
    });

    loading.present();
  }
  ngOnInit() {
    this.formInit();
    console.log(this.tarjeta);
    if(this.tarjeta != null){
      this.showLoading(2000)
      this.setData(this.tarjeta);
    }else{
      this.getBancosListar(null);
      this.getProveedoresTarjetaListar(null);
    }
  }

  formInit(){
    this.tarjetaForm = this.fb.group({
      nombre: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      proveedorTarjeta: [null, [Validators.required]],
      tipoTarjeta: [null, [Validators.required]],
      tipoCierre: [null, [Validators.required]],
      hasNotifyCelular: [false],
      hasNotifyEmail: [false],
    });
  }

  async setData(data:any){
    this.tarjetaForm.controls['nombre'].setValue(data.nombreTarjeta);
    this.tarjetaForm.controls['hasNotifyCelular'].setValue(data.hasNotifyCelular);
    this.tarjetaForm.controls['hasNotifyEmail'].setValue(data.hasNotifyEmail);
    await this.getBancosListar(data.idBanco);
    await this.getProveedoresTarjetaListar(data.idProveedorTarjeta);
    await this.getTipoTarjetaListar(data.idBanco,data.idProveedorTarjeta,data.idTipoTarjeta);
    await this.getTipoCierreListar(data.idBanco,data.idTipoCierre);
  }
  async getBancosListar(posibleValor){
    const getBancosListar = await this.bancoService.getBancosListar();

    getBancosListar.subscribe({
      next: async (resp: any) => {
        this.array_banco = resp;
        if(posibleValor!= null){
          this.tarjetaForm.controls['banco'].setValue(posibleValor);
        }
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }

  async getProveedoresTarjetaListar(posibleValor){

    const getProveedoresTarjetaListar = await this.proveedorTarjetaService.getProveedoresTarjetaListar();

    getProveedoresTarjetaListar.subscribe({
      next: async (resp: any) => {
        this.array_proveedorTarjeta = resp;
        if(posibleValor!= null){
          this.tarjetaForm.controls['proveedorTarjeta'].setValue(posibleValor);
        }
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }

  async getTipoTarjetaListar(bancoId,proveedorTarjetaId,posibleValor){
    console.log(bancoId);
    if(bancoId &&bancoId!=null && bancoId!=undefined &&
       proveedorTarjetaId &&proveedorTarjetaId!=null && proveedorTarjetaId!=undefined)
      {
      const getTiposTarjetaListar = await this.tipoTarjetaService.getTipoTarjetaListar(bancoId,proveedorTarjetaId);

      getTiposTarjetaListar.subscribe({
        next: async (resp: any) => {
          this.array_tipoTarjeta = resp;
          if(posibleValor!= null){
            this.tarjetaForm.controls['tipoTarjeta'].setValue(posibleValor);
          }
          this.chgRef.markForCheck();
        },
        error: async (error) => {
          this.toastrService.alertaInformativa(error?.error?.message || error?.message);
          console.log(error);
        },
      });
    }
    else{
      this.array_tipoTarjeta = []
    }

  }

  async getTipoCierreListar(bancoId,posibleValor){
    console.log(bancoId);
    if(bancoId && bancoId!=null && bancoId!=undefined)
      {
      const getTipoCierreListar = await this.tipoCierreService.getTipoCierreListar(bancoId);

      getTipoCierreListar.subscribe({
        next: async (resp: any) => {
          this.array_tipoCierre = resp;
          if(posibleValor!= null){
            this.tarjetaForm.controls['tipoCierre'].setValue(posibleValor);
          }
          this.chgRef.markForCheck();
        },
        error: async (error) => {
          this.toastrService.alertaInformativa(error?.error?.message || error?.message);
          console.log(error);
        },
      });
    }
    else{
      this.array_tipoCierre = []
    }
  }

  private prepareModel(){
    const formData = this.tarjetaForm.value;
    return {
			nombre:         formData.nombre,
			tipoTarjetaId:  formData.tipoTarjeta,
			tipoCierreId:   formData.tipoCierre,
			isActive:       true,
			hasNotifyCelular: formData.hasNotifyCelular,
			hasNotifyEmail:   formData.hasNotifyEmail,
    }
  }

  async onSubmit() {
    const controls = this.tarjetaForm.controls;
    if ( this.tarjetaForm.invalid ) {
      Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
      this.toastrService.alertaInformativa('Formulario Inválido');
      return;
    }
    const model = this.prepareModel()
    if(this.tarjeta != null){
      const update = await this.tarjetaService.update(this.tarjeta.idTarjetaCredito,model);

      update.subscribe({
        next: async (resp: any) => {
          console.log(resp);
          if (resp.ok) {
            console.log(resp);
            this.modalController.dismiss(resp);
          } else {
            this.toastrService.alertaInformativa(resp.message || resp);
          }
          this.chgRef.markForCheck();
        },
        error: async (error) => {
          this.toastrService.alertaInformativa(error?.error?.message || error?.message);
          console.log(error);
        },
      });
    }else{
      const create = await this.tarjetaService.create(model);

      create.subscribe({
        next: async (resp: any) => {
          console.log(resp);
          if (resp.ok) {
            console.log(resp);
            this.modalController.dismiss(resp);
          } else {
            this.toastrService.alertaInformativa(resp.message || resp);
          }
          this.chgRef.markForCheck();
        },
        error: async (error) => {
          this.toastrService.alertaInformativa(error?.error?.message || error?.message);
          console.log(error);
        },
      });
    }

  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.tarjetaForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.tarjetaForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.tarjetaForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.tarjetaForm.controls[controlName];
    return control.dirty || control.touched;
  }

  cerrarModal(){
    this.modalController.dismiss(null);
  }
}
