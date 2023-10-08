import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';

@NgModule({
  declarations: [
    AvatarSelectorComponent,
  ],
  exports: [
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
