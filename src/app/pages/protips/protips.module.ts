import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProtipsPageRoutingModule } from './protips-routing.module';

import { ProtipsPage } from './protips.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProtipsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProtipsPage]
})
export class ProtipsPageModule {}
