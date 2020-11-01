import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ng2ChartsPageRoutingModule } from './ng2-charts-routing.module';
import { Ng2ChartsPage } from './ng2-charts.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2ChartsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ng2ChartsPage]
})
export class Ng2ChartsPageModule { }
