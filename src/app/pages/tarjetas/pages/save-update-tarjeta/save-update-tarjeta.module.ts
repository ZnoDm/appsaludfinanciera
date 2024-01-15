import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveUpdateTarjetaPageRoutingModule } from './save-update-tarjeta-routing.module';

import { SaveUpdateTarjetaPage } from './save-update-tarjeta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveUpdateTarjetaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [SaveUpdateTarjetaPage]
})
export class SaveUpdateTarjetaPageModule {}
