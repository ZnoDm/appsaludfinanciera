import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ProfilePageModule } from '../profile/profile.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'protips',
        loadChildren: () => import('../protips/protips.module').then( m => m.ProtipsPageModule)
      },
      {
        path: 'gastos',
        loadChildren: () => import('../gastos/gastos.module').then(m => m.GastosPageModule)
      },
      {
        path: 'tarjetas',
        loadChildren: () => import('../tarjetas/tarjetas.module').then( m => m.TarjetasPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/gastos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/gastos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
