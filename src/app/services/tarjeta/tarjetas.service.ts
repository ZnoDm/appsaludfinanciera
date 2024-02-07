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

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  apiUrl = environment.apiUrl + '/tarjeta';

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
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

  async getTarjetasByPerson(){
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.get(`${this.apiUrl}/recordatorio/listar`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  async getAniosByTarjeta(idTarjeta:number){
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.get(`${this.apiUrl}/${idTarjeta}/recordatorio/anios`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  async getPeriodosByTarjeta(idTarjeta:number,anio:number){
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.get(`${this.apiUrl}/${idTarjeta}/recordatorio/periodos?anio=${anio}`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  async getCronogramaByTarjeta(idTarjeta:number,anio:number,mes:number){
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.get(`${this.apiUrl}/${idTarjeta}/recordatorio/cronograma?anio=${anio}&mes=${mes}`, {
      headers: headers
    }).pipe(
      map(data => data),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  async create(data) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.post(`${ this.apiUrl }`, data ,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }

  async update(idTarjeta,data) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.patch(`${ this.apiUrl }/${ idTarjeta }`, data ,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }
  async enabledDisabledTarjeta(data) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.post(`${ this.apiUrl }`, data ,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }
  async delete(idTarjeta) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.delete(`${ this.apiUrl }/${ idTarjeta }`,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }
  async enabledDisabled(idTarjeta) {
    this.isLoadingSubject.next(true);
    const headers = await this.obtenerHeaders();
    return this.http.post(`${ this.apiUrl }/${ idTarjeta }/enabled-disabled`,{
      headers: headers
    }).pipe(
      map( data => data ),
      finalize( () =>{this.isLoadingSubject.next(false);})
    );
  }


}
