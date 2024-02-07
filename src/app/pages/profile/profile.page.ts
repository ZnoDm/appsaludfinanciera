import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Person, Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { SettingsPage } from './pages/settings/settings.page';
import { ChangePasswordPage } from './pages/change-password/change-password.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario = null;
  constructor(
    private router: Router,
    private authService:AuthService,
    private modalController: ModalController,
    private toastrService: ToastrService,
  ) {

  }

  ionViewWillEnter() {
    this.getUser();
  }
  ngOnInit() {
  }
  async getUser(){
    const user = await this.authService.getCurrentUserValue();
    this.usuario =  user;
  }

  navigateToSettings() {
    this.modalController.create({
      component: SettingsPage,
      componentProps: {urlImagen : this.usuario.person.urlAvatar}
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(async ({ data, role }) => {
        console.log(data);
        if(data.ok){
          this.toastrService.presentToast(data.message);
        }
        await this.getUser();
      });
  }
  navigateToChangePassword() {
    this.modalController.create({
      component: ChangePasswordPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(async ({ data, role }) => {
        console.log(data);
        if(data.ok){
          this.toastrService.presentToast(data.message);
        }
        this.getUser();
      });
  }
  async logout(){
    await this.authService.logout();
  }

  handleRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
