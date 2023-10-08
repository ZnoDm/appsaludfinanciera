import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonModal, ModalController } from '@ionic/angular';
import { HeaderPeriodoComponent } from 'src/app/components/header-periodo/header-periodo.component';



@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  
  ngOnInit() {
  }

  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(
    private modalCtrl: ModalController,
    private animationController: AnimationController
    ) {}

  async openModal() {

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

  }
}
