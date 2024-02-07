import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HeaderBasicAuthorizationService } from '../header-basic-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  apiUrl = environment.apiUrl + '/cuenta';
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

  async getGraficoDonaResumen() {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.get(`${ this.apiUrl }/grafico/donaHistorial`, {
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }
  async getHistoriaCuentaByPerson(idCuenta:number) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.get(`${ this.apiUrl }/${idCuenta}/historial`, {
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }




  async getCuentasListarByUser() {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.get(`${this.apiUrl}/listar/user`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  async getResumenGastoByPerson() {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.get(`${this.apiUrl}/resumen/user`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  async create(data) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.post(`${ this.apiUrl }`, data ,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  async update(idCuenta,data) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.patch(`${ this.apiUrl }/${ idCuenta }`, data ,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  async addGasto(data) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.httpClient.post(`${ this.apiUrl }/gasto/add`, data ,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

}
