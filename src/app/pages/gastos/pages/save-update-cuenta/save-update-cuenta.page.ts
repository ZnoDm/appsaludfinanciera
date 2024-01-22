import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-save-update-cuenta',
  templateUrl: './save-update-cuenta.page.html',
  styleUrls: ['./save-update-cuenta.page.scss'],
})
export class SaveUpdateCuentaPage implements OnInit {

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(
  ){

  }

  cerrarModal(){
    this.modalController.dismiss(null,'cerrado');
    }

}
