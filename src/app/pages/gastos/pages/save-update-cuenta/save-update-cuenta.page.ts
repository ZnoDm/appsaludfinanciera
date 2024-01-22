import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-save-update-cuenta',
  templateUrl: './save-update-cuenta.page.html',
  styleUrls: ['./save-update-cuenta.page.scss'],
})
export class SaveUpdateCuentaPage implements OnInit {

  cuentaForm: FormGroup;
  array_metas = ['Meta1', 'Meta2', 'Meta3']; // Agrega las metas que desees

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.cuentaFormInit();
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

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log(this.cuentaForm.value);
  }
  cerrarModal(){
    this.modalController.dismiss(null,'cerrado');
  }

}
