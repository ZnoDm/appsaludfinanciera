import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PickerController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  providers: [ DatePipe ]
})
export class AgregarPage implements OnInit {

  fechaActual : any;

  constructor(
    private pickerController: PickerController,
    private modalController: ModalController,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }


  selectedDate: Date;
  async showDatePicker() {
    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'date',
          options: [
            // Puedes personalizar las opciones de fecha según tus necesidades.
            { text: '01/01/2023', value: new Date(2023, 0, 1) },
            { text: '02/01/2023', value: new Date(2023, 0, 2) },
            // Agrega más opciones aquí
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (value) => {
            this.selectedDate = value.date.value;
          },
        },
      ],
    });
    await picker.present();
  }

  date_event:any;
  datePick(){
    this.date_event = this.date_event.substring(0, 10);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
