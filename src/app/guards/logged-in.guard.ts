
import { Injectable } from '@angular/core';

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    ) {}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const valor = await this.authService.isLoggedIn();
      console.log(valor);
      if (valor) {
        return true;
      }

      this.authService.redirectToLogin();
      return false;
    }
}
