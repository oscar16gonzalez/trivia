import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelebracionPage } from './celebracion.page';

const routes: Routes = [
  {
    path: '',
    component: CelebracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelebracionPageRoutingModule {}
