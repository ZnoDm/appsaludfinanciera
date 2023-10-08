import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    AuthPageRoutingModule,

    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
    ComponentsModule
  ],
  declarations: [ AuthPage ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthPageModule {}
