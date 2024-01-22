import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person, Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario = null;
  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {

  }
  
  ionViewWillEnter() {
    this.getUser();
  }

  async getUser(){
    const user = await this.authService.getCurrentUserValue();
    console.log(user)
    this.usuario =  user;
  }

  navigateToSettings() {
    this.router.navigate(['/main/tabs/profile/settings']);
  }
  navigateToChangePassword() {
    this.router.navigate(['main/tabs/profile/change-password']);
  }
  async logout(){
    await this.authService.logout();
  }
}
