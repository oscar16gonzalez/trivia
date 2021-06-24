import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'season',
    loadChildren: () => import('./pages/season/season.module').then( m => m.SeasonPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'celebracion',
    loadChildren: () => import('./pages/celebracion/celebracion.module').then( m => m.CelebracionPageModule)
  },
  {
    path: 'tutoriales',
    loadChildren: () => import('./pages/tutoriales/tutoriales.module').then( m => m.TutorialesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
