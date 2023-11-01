import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProtipsPageRoutingModule } from './protips-routing.module';

import { ProtipsPage } from './protips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProtipsPageRoutingModule
  ],
  declarations: [ProtipsPage]
})
export class ProtipsPageModule {}
