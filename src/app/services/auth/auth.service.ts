import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';

interface DataLogin  {
  email: string;
  password: string;
}
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;
  usuario: Usuario = {};

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.init();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  async init() {
    await this.storage.create();
  }


  login( email: string, password: string ) {

    const data = { email, password };

    this.isLoadingSubject.next(true);

    return new Promise( resolve => {

      this.http.post(`${ URL }/api/auth/login`, data )
      .subscribe({
        next: async (resp : any) => {
          if (resp.ok) {
            await this.guardarToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        },
        error: (error) => {
          console.log(error)
          this.toastr.alertaInformativa(error.error.message);

          this.isLoadingSubject.next(false);
          resolve(false);
        },
        complete: () => {
          this.isLoadingSubject.next(false);
        },
      });

    });

  }

  registro( usuario: Usuario ) {
    this.isLoadingSubject.next(true);

    return new Promise( resolve => {

      this.http.post(`${ URL }/api/auth/register`, usuario )
      .subscribe({
        next: async (resp : any) => {
          if (resp.ok) {
            await this.guardarToken(resp.token);
            this.toastr.presentToast("Su cuenta fue creada con éxito")
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        },
        error: (error) => {
          console.log(error)
          this.toastr.alertaInformativa(error.error.message);

          this.isLoadingSubject.next(false);
          resolve(false);
        },
        complete: () => {
          this.isLoadingSubject.next(false);
        },
      });
    });


  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }


  async validaToken(): Promise<boolean> {
    await this.cargarToken();
    if ( !this.token ) {
      this.redirectToLogin()
      return Promise.resolve(false);
    }


    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });

      this.http.get(`${ URL }/api/auth/check-status`, { headers })
        .subscribe( {
          next: (resp:any) => {
            if ( resp.ok ) {
              this.usuario = resp.user;
              console.log(this.usuario);
              resolve(true);
            } else {
              this.redirectToLogin()
              resolve(false);
            }
          },
          error: (error) => {
            this.redirectToLogin()
            resolve(false);
          },
        });


    });

  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
    console.log('cargar Token:', this.token);
  }


  logout() {
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/auth', { animated: true });
  }


  async isLoggedIn() : Promise<boolean>{
    await this.cargarToken();
    if ( !this.token ) {
      return Promise.resolve(true);
    }
    this.redirectToMain();
    return Promise.resolve(false);
  }

  getUsuario() {
    return { ...this.usuario };
  }

  redirectToLogin() {
    this.router.navigate(['auth'])
  }

  redirectToMain() {
    this.router.navigate(['main/tabs/gastos'])
  }

  /* actualizarUsuario( usuario: Usuario ) {


    const headers = new HttpHeaders({
      'x-token': this.token
    });


    return new Promise( resolve => {

      this.http.post(`${ URL }/user/update`, usuario, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            resolve(false);
          }

        });

    });



  } */


}
