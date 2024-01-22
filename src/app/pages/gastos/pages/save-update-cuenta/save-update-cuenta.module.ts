import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveUpdateCuentaPageRoutingModule } from './save-update-cuenta-routing.module';

import { SaveUpdateCuentaPage } from './save-update-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveUpdateCuentaPageRoutingModule
  ],
  declarations: [SaveUpdateCuentaPage]
})
export class SaveUpdateCuentaPageModule {}
