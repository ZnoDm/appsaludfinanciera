import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-periodo',
  templateUrl: './header-periodo.component.html',
  styleUrls: ['./header-periodo.component.scss'],
})
export class HeaderPeriodoComponent  implements OnInit {


  selectedSegment: string = 'home';
  name: string;

  constructor(
    private modalCtrl: ModalController
  ) {  }

  ngOnInit() {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
    // Ahora puedes hacer algo con this.selectedSegment
    console.log('Valor seleccionado:', this.selectedSegment);
    this.cancel()
  }
}
