import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsPage } from './news.page';

const routes: Routes = [
  {
    path: '',
    component: NewsPage,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full', // Redirecciona a la página de "Favoritos" por defecto
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
