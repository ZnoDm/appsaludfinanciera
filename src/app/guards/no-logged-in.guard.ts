import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedInGuard implements CanLoad {

  constructor( private authService: AuthService ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    console.log(this.authService.usuario)
    if (this.authService.usuario.email) {
      this.authService.redirectToMain();
      return false;
    }
    return true;
  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return false;
  // }

}
