import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AnimacionesPageRoutingModule } from './animaciones-routing.module';
import { AnimacionesPage } from './animaciones.page';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AnimacionesPage]
})
export class AnimacionesPageModule { }
