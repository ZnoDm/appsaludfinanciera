import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subscription, catchError, finalize, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';
import { StorageService } from '../storage.service';
import { StorageKeyEnum } from 'src/app/enums/storage-key.enum';
import * as jwtDecode from 'jwt-decode';
import { JwtService } from '../jwt.service';
import { resolve } from 'dns';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<any>;

  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService,
    private jwtService:JwtService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  login( email: string, password: string ) {

    const data = { email, password };

    this.isLoadingSubject.next(true);

    return new Promise( resolve => {

      this.http.post(`${ URL }/auth/login`, data )
      .subscribe({
        next: async (response : any) => {
          if (response.ok) {
            this.storageService.set(StorageKeyEnum.USER_DETAIL, JSON.stringify(response.user));
            this.storageService.set(StorageKeyEnum.JWT_AUTHORIZATION, response.token);
            this.jwtService.load(response.JWT);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (error) => {
          console.log(error)
          this.toastr.alertaInformativa(error?.error?.message || error?.message);

          this.isLoadingSubject.next(false);
          resolve(false);
        },
        complete: () => {
          this.isLoadingSubject.next(false);
        },
      });

    });

  }

  async getCurrentUserValue() {
    let userData = await this.storageService.get(StorageKeyEnum.USER_DETAIL)
    const user: any = JSON.parse(userData);
    return user;
  }

  async setCurrentUserValue(person) {
    await  this.storageService.set(StorageKeyEnum.USER_DETAIL, JSON.stringify(person));
  }


  async isLoggedIn() {
    let jwt = await this.storageService.get(StorageKeyEnum.JWT_AUTHORIZATION);
    console.log(jwt);
    if (jwt != null) {
        this.jwtService.load(jwt);
        console.log(this.jwtService.isValid())
        return this.jwtService.isValid();
    } else {
        return false;
    }
  }

  async logout() {
    this.storageService.remove(StorageKeyEnum.JWT_AUTHORIZATION);
    this.storageService.remove(StorageKeyEnum.USER_DETAIL);
    this.jwtService.clear();
    this.router.navigate(['/auth/login']);
  }

  registro( usuario: Usuario ) {
    this.isLoadingSubject.next(true);

    return new Promise( resolve => {

      this.http.post(`${ URL }/auth/register`, usuario )
      .subscribe({
        next: async (resp : any) => {
          if (resp.ok) {
            this.toastr.presentToast("Su cuenta fue creada con éxito")
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (error) => {
          console.log(error)
          this.toastr.alertaInformativa(error.error.message ?? error.message);

          this.isLoadingSubject.next(false);
          resolve(false);
        },
        complete: () => {
          this.isLoadingSubject.next(false);
        },
      });
    });


  }

  redirectToLogin() {
    this.router.navigate(['auth'])
  }

  redirectToMain() {
    this.router.navigate(['main/tabs/gastos'])
  }

}
