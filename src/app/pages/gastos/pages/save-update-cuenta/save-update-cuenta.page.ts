import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MetaService } from '../../../../services/meta/meta.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-save-update-cuenta',
  templateUrl: './save-update-cuenta.page.html',
  styleUrls: ['./save-update-cuenta.page.scss'],
})
export class SaveUpdateCuentaPage implements OnInit {

  cuentaForm: FormGroup;
  array_metas:any = []

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private metaService:MetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(){
    this.cuentaFormInit();
    this.getMetasListar(null);
  }

  cuentaFormInit() {
    this.cuentaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      saldo: ['', Validators.required],
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
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log(this.cuentaForm.value);
  }
  cerrarModal(){
    this.modalController.dismiss(null,'cerrado');
  }

}
