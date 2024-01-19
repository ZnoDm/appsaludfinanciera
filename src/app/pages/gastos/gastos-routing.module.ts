import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosPage } from './gastos.page';

const routes: Routes = [
  {
    path: '',
    component: GastosPage
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastosPageRoutingModule {}
