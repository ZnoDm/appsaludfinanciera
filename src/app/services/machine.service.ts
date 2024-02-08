import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  apiUrl = environment.apiUrlMachine;
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

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
  async getGastosCategoria() {
    this.isLoadingSubject.next(true);
    return this.httpClient.get(`${ this.apiUrl }/gastosCategoria/8`,
    ).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  async gastosMes() {
    this.isLoadingSubject.next(true);
    return this.httpClient.get(`${ this.apiUrl }/gastosMes/8`,
    ).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  async getGastosHormiga() {
    this.isLoadingSubject.next(true);
    return this.httpClient.get(`${ this.apiUrl }/gastosHormiga/8`, ).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }



}
