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

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }


  navigateToSettings() {
    this.router.navigate(['/main/tabs/profile/settings']);
  }
  navigateToChangePassword() {
    this.router.navigate(['main/tabs/profile/change-password']);
  }
}
