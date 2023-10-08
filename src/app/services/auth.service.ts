import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/interfaces';
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
          console.log(resp);

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
          this.isLoadingSubject.next(false);
          this.toastr.alertaInformativa(error || error.error.message);
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
    return this.validaToken();
  }


  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      this.redirectToMain()
      return Promise.resolve(false);
    }


    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });

      this.http.get(`${ URL }/api/auth/check-status`, { headers })
        .subscribe( (resp:any) => {

          if ( resp.ok ) {
            console.log(resp)
            this.usuario = resp.usuario;
            resolve(true);
          } else {
            this.redirectToLogin()
            resolve(false);
          }

        });


    });

  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }


  logout() {
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

 /*  registro( usuario: Usuario ) {

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/create`, usuario )
          .subscribe( async resp => {
            console.log(resp);

            if ( resp['ok'] ) {
              await this.guardarToken( resp['token'] );
              resolve(true);
            } else {
              this.token = null;
              this.storage.clear();
              resolve(false);
            }

          });


    });


  } */

  getUsuario() {
    if ( !this.usuario.id ) {
      this.validaToken();
    }
    return { ...this.usuario };

  }

  redirectToLogin() {
    this.router.navigate(['auth'])
  }

  redirectToMain() {
    this.router.navigate(['main/tabs/tab1'])
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
