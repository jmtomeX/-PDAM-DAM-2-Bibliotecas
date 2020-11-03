import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmbeddedPage } from './embedded.page';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmbeddedPage
      }
    ])
  ],
  declarations: [EmbeddedPage]
})
export class EmbeddedPageModule {}
