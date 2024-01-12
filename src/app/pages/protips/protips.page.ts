import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protips',
  templateUrl: './protips.page.html',
  styleUrls: ['./protips.page.scss'],
})
export class ProtipsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


/*
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;

  message = 'This modal example uses the modalController to present and dismiss modals.';
  valorModal : boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private animationController: AnimationController,
    private pickerController: PickerController
    ) {} */

/*   async openModal() {

    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = this.animationController
        .create()
        .addElement(root.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationController
        .create()
        .addElement(root.querySelector('.modal-wrapper'))
        .keyframes([
          { offset: 0, opacity: '0', transform: 'translateY(-180%)', 'z-index': '9' },
          { offset: 1, opacity: '0.99', transform: 'translateY(-167%)', 'z-index': '9' },
        ]);

      return this.animationController
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    const modal = await this.modalCtrl.create({
      component: HeaderPeriodoComponent,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      cssClass: 'modal-header-periodo',
      showBackdrop: true,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }

  } */

  /* ngOnInit() {
  }

  ngAfterViewInit(){
    Chart.register(...registerables);
    this.barChartMethod();
  }

  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: "bar",
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {

        }
      }
    });
  }

  showModal(){
    this.valorModal = !this.valorModal
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
  } */
}
