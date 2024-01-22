import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveUpdateCuentaPage } from './save-update-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: SaveUpdateCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveUpdateCuentaPageRoutingModule {}
