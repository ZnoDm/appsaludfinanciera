import { DatePipe } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject, ViewChild, ElementRef } from '@angular/core';
import { PickerController, ModalController, IonModal, IonicSlides } from '@ionic/angular';
import { register } from 'swiper/element';
import { Swiper, SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  providers: [ DatePipe ]
})
export class AgregarPage implements OnInit {
  swiperModules = [IonicSlides];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;


  fechaActual : any;
  nombreDia: string;
  fechaMes: string;

  array_categorias:any =  [ {id:1, nombre:'Indriver',active:true},{id:1,nombre:'Golosinas',active:false},{id:1,nombre:'Demo',active:false},{id:1,nombre:'Indriver',active:false} ]

  constructor(
    private modalController: ModalController,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) { }


  tuModelo: string;
  validarNumero(event: any): void {
    this.tuModelo = event.target.value.replace(/[^0-9.]/g, '');
    const partes = this.tuModelo.split('.');
    if (partes[0].length > 3) {
      partes[0] = partes[0].slice(0, 3);
    }
    if (partes.length > 1) {
      partes[1] = partes[1].slice(0, 2);
    }
    this.tuModelo = partes.join('.');
  }


  ngOnInit() {
    const fecha = new Date();
    this.obtenerFechaActualConFormato(fecha);
  }

  obtenerFechaActualConFormato(fecha:Date){
    const formato = 'EEEE d \'de\' MMMM';
    this.fechaActual = this.datePipe.transform(fecha, formato, null, this.locale);
    this.nombreDia= this.datePipe.transform(fecha, 'EEEE', null, this.locale);
    this.fechaMes= this.datePipe.transform(fecha, 'd \'de\' MMMM', null, this.locale);
  }

  showCalendar = false;
  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    if(selectedDate != null){
      console.log('Fecha seleccionada:', selectedDate);
      this.obtenerFechaActualConFormato(selectedDate)
    }
  }
  openCalendar() {
    this.showCalendar = true;
  }
  cancelCalendar() {
    this.showCalendar = false;
  }
  closeModal() {
    this.modalController.dismiss();
  }


  onCategorySelected(){
    console.log('categoria seleccionada');
  }
}
