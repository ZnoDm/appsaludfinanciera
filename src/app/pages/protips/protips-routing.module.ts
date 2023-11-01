import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtipsPage } from './protips.page';

const routes: Routes = [
  {
    path: '',
    component: ProtipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtipsPageRoutingModule {}
