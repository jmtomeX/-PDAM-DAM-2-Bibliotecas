import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ng2ChartsPage } from './ng2-charts.page';

const routes: Routes = [
  {
    path: '',
    component: Ng2ChartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ng2ChartsPageRoutingModule {}
