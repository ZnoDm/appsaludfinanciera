import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetasPage } from './tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetasPage
  },
  {
    path: 'show',
    loadChildren: () => import('./pages/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'save-update-tarjeta',
    loadChildren: () => import('./pages/save-update-tarjeta/save-update-tarjeta.module').then( m => m.SaveUpdateTarjetaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetasPageRoutingModule {}
