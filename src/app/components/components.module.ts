import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ArticleComponent } from './news/article/article.component';
import { ArticlesComponent } from './news/articles/articles.component';
import { CalendarioTarjetaComponent } from './tarjetas/calendario-tarjeta/calendario-tarjeta.component';
import { LogoComponent } from './logo/logo.component';
import { EsloganComponent } from './eslogan/eslogan.component';
import { AvatarComponent } from './avatar/avatar.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { PeriodoTarjetaComponent } from './tarjetas/periodo-tarjeta/periodo-tarjeta.component';
import { AvatarEditComponent } from './avatar-edit/avatar-edit.component';
import { LogoHeaderComponent } from './logo-header/logo-header.component';
import { CuentaComponent } from './gastos/cuenta/cuenta.component';
import { HistorialComponent } from './gastos/historial/historial.component';
import { AvatarSlimComponent } from './gastos/avatar-slim/avatar-slim.component';
import { ChartPieComponent } from './gastos/chart-pie/chart-pie.component';
import { ResumenComponent } from './gastos/resumen/resumen.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    LogoComponent,
    LogoHeaderComponent,
    EsloganComponent,

    AvatarComponent,
    AvatarEditComponent,
    AvatarSlimComponent,
    CalendarioTarjetaComponent,
    PeriodoTarjetaComponent,

    HistorialComponent,
    CuentaComponent,
    ChartPieComponent,
    ResumenComponent
  ],
  exports: [
    ArticleComponent,
    ArticlesComponent,
    LogoComponent,
    LogoHeaderComponent,
    EsloganComponent,
    AvatarComponent,
    AvatarEditComponent,
    AvatarSlimComponent,
    CalendarioTarjetaComponent,
    PeriodoTarjetaComponent,

    HistorialComponent,
    CuentaComponent,
    ChartPieComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
