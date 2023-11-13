import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';
import { AuthService } from '../auth/auth.service';
import { HeaderBasicAuthorizationService } from '../header-basic-authorization.service';

interface DataLogin  {
  email: string;
  password: string;
}
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private headerBasicAuthorization: HeaderBasicAuthorizationService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getPerson() {
    this.isLoadingSubject.next(true);
    return this.http.get(`${ URL }/person` ,{
      headers: this.headerBasicAuthorization.get()
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  updateAvatar(data) {
    this.isLoadingSubject.next(true);
    return this.http.patch(`${ URL }/person/update/avatar`, data ,{
      headers: this.headerBasicAuthorization.get()
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  updatePerson(data) {
    this.isLoadingSubject.next(true);
    return this.http.patch(`${ URL }/person/update`, data ,{
      headers: this.headerBasicAuthorization.get()
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

}
