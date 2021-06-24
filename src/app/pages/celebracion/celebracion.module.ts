import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CelebracionPageRoutingModule } from './celebracion-routing.module';

import { CelebracionPage } from './celebracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CelebracionPageRoutingModule
  ],
  declarations: [CelebracionPage]
})
export class CelebracionPageModule {}
