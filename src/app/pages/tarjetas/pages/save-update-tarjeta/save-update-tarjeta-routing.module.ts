import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveUpdateTarjetaPage } from './save-update-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: SaveUpdateTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveUpdateTarjetaPageRoutingModule {}
