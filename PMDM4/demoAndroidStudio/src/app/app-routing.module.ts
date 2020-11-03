import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then(m => m.CamaraPageModule)
  },
  {
    path: 'video-player',
    loadChildren: () => import('./pages/video-player/video-player.module').then(m => m.VideoPlayerPageModule)
  },
  {
    path: 'ng2-charts',
    loadChildren: () => import('./pages/ng2-charts/ng2-charts.module').then(m => m.Ng2ChartsPageModule)
  },
  {
    path: 'animaciones',
    loadChildren: () => import('./pages/animaciones/animaciones.module').then(m => m.AnimacionesPageModule)
  },
  {
    path: 'embedded',
    loadChildren: () => import('./pages/embedded/embedded.module').then(m => m.EmbeddedPageModule)
  },
  {
    path: 'fullscreen',
    loadChildren: () => import('./pages/fullscreen/fullscreen.module').then(m => m.FullscreenPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
