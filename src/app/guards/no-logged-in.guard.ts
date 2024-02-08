import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const valor = await this.authService.isLoggedIn();
    if (!valor) {
      return true;
    }

    this.authService.redirectToMain();
    return false;
  }

}
