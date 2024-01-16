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


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  apiUrl = environment.apiUrl + '/person';
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private headerBasicAuthorization: HeaderBasicAuthorizationService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

  }

  async obtenerHeaders() {
    try {
      const headers = await this.headerBasicAuthorization.getHeaders();
      return headers;
    } catch (error) {
      console.error("Error al obtener los encabezados:", error);
      return null;
    }
  }

  async getPerson() {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.get(`${this.apiUrl}`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateAvatar(data) {
    this.isLoadingSubject.next(true);
    return this.httpClient.patch(`${ this.apiUrl }/update/avatar`, data ,{
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  updatePerson(data) {
    this.isLoadingSubject.next(true);
    return this.httpClient.patch(`${ this.apiUrl }/update`, data ,{
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

}
