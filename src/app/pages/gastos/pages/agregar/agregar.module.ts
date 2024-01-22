import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPageRoutingModule } from './agregar-routing.module';

import { AgregarPage } from './agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AgregarPageModule {}
