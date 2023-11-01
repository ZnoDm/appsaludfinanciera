import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad {

  constructor( private authService: AuthService ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authService.validaToken() || false;
  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return false;
  // }

}
