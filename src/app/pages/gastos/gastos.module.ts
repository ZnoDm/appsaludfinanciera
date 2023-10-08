import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosPageRoutingModule } from './gastos-routing.module';

import { GastosPage } from './gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule
  ],
  declarations: [GastosPage]
})
export class GastosPageModule {}
