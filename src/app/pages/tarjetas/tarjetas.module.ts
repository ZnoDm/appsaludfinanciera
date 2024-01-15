import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetasPageRoutingModule } from './tarjetas-routing.module';

import { TarjetasPage } from './tarjetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetasPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TarjetasPage]
})
export class TarjetasPageModule {}
