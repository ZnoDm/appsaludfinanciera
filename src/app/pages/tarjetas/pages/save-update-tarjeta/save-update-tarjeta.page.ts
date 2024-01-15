import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../../../services/toastr.service';
import { TarjetaService } from 'src/app/services/tarjetas/tarjetas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-save-update-tarjeta',
  templateUrl: './save-update-tarjeta.page.html',
  styleUrls: ['./save-update-tarjeta.page.scss'],
})
export class SaveUpdateTarjetaPage implements OnInit {


  tarjetaForm: FormGroup;

  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private tarjetaService:TarjetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
  ) {
    this.isLoading$ = this.tarjetaService.isLoading$;
   }

  ngOnInit() {
    this.formInit();
  }


  formInit(){
    this.tarjetaForm = this.fb.group({
      nombre: ['', Validators.required],
      banco: ['', Validators.required],
      proveedorTarjeta: ['', Validators.required],
      tipoTarjeta: ['', Validators.required],
      tipoCierre: ['', Validators.required],
      hasNotifyCelular: [false],
      hasNotifyEmail: [false],
    });
  }

  private prepareModel(){
    const formData = this.tarjetaForm.value;
    return {
			nombre:         formData.nombre,
			tipoTarjetaId:  formData.tipoTarjeta,
			tipoCierreId:   formData.tipoCierre,
			isActive:       formData.isActive,
			hasNotifyCelular: formData.hasNotifyCelular,
			hasNotifyEmail:   formData.hasNotifyEmail,
    }
  }

  async onSubmit() {
    if ( this.tarjetaForm.invalid ) {
      this.toastrService.alertaInformativa('Formulario Inválido');
      return;
    }
    const model = this.prepareModel()
    const create = await this.tarjetaService.create(model);

    create.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }



}
