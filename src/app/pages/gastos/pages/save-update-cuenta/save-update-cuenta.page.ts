import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MetaService } from '../../../../services/meta/meta.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { CuentaService } from '../../../../services/cuenta/cuenta.service';

@Component({
  selector: 'app-save-update-cuenta',
  templateUrl: './save-update-cuenta.page.html',
  styleUrls: ['./save-update-cuenta.page.scss'],
})
export class SaveUpdateCuentaPage implements OnInit {

  @Input() cuenta: any = null;

  cuentaForm: FormGroup;
  array_metas:any = []

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private metaService:MetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private cuentaService: CuentaService
  ) { }

  ngOnInit(){

    this.cuentaFormInit();
    console.log(this.cuenta);
    if(this.cuenta != null){
      this.setData(this.cuenta);
    }else{
      this.getMetasListar(null);
    }
  }

  async setData(data:any){
    this.cuentaForm.controls['nombre'].setValue(data.nombre);
    this.cuentaForm.controls['saldoMensualPromedio'].setValue(data.saldoMensualPromedio);
    await this.getMetasListar(data.idMeta);
  }

  cuentaFormInit() {
    this.cuentaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      saldoMensualPromedio: ['', Validators.required],
      metas: ['', Validators.required],
      metaOtro: ['']
    });
  }

  async getMetasListar(posibleValor){
    const getMetasListar = await this.metaService.getMetasListar();

    getMetasListar.subscribe({
      next: async (resp: any) => {
        this.array_metas = resp;
        if(posibleValor!= null){
          this.cuentaForm.controls['metas'].setValue(posibleValor);
        }
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }

  private prepareModel () {
     const formData = this.cuentaForm.value;
    return {
			nombre:         formData.nombre,
      saldoMensualPromedio: formData.saldoMensualPromedio,
      metaId: formData.metas,
      otraMeta: formData.metaOtro
    }
  }


  async onSubmit() {
    const controls = this.cuentaForm.controls;
    if ( this.cuentaForm.invalid ) {
      Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
      this.toastrService.alertaInformativa('Formulario Inválido');
      return;
    }
    const model = this.prepareModel()
    if(this.cuenta != null){
      const update = await this.cuentaService.update(this.cuenta.id,model);

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
      const create = await this.cuentaService.create(model);

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
    console.log(this.cuentaForm.value);
  }

  cerrarModal(){
    this.modalController.dismiss(null);
  }

}
