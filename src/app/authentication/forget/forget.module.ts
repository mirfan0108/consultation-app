import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgetPage } from './forget.page';
import { ForgetPageRoutingModule } from './forget-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetPageRoutingModule
  ],
  declarations: [ForgetPage]
})
export class ForgetPageModule {}
