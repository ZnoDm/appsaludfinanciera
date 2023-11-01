import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { NoLoggedInGuard } from './guards/no-logged-in.guard';

const routes: Routes = [
  {
    path: 'auth',
  /*   canLoad: [ NoLoggedInGuard], */
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'main',
  /*   canLoad: [ LoggedInGuard], */
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path  : '',
    pathMatch :  'full',
    redirectTo  : 'auth',
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
