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
    console.log('Guard: ruta auth')
   return this.authService.isLoggedIn();

  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return false;
  // }

}
