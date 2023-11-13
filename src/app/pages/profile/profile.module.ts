import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SettingsPageModule } from './pages/settings/settings.module';
import { SettingsPage } from './pages/settings/settings.page';

@NgModule({
  declarations: [
    ProfilePage
  ],
  imports: [
    ProfilePageRoutingModule,

    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    ComponentsModule,
  ],

})
export class ProfilePageModule {}
