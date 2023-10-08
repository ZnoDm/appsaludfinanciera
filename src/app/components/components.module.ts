import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { HeaderComponent } from './header/header.component';
import { HeaderPeriodoComponent } from './header-periodo/header-periodo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AvatarSelectorComponent,
    HeaderComponent,
    HeaderPeriodoComponent
  ],
  exports: [
    AvatarSelectorComponent,
    HeaderPeriodoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
