import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConselorPage } from './conselor.page';
import { ComplainDetailPage } from '../modal/complain-detail/complain-detail.page';
import { ConselingDetailPage } from '../modal/conseling-detail/conseling-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ConselorPage
  }
];

@NgModule({
  entryComponents: [
    ComplainDetailPage,
    ConselingDetailPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConselorPage, ComplainDetailPage, ConselingDetailPage]
})
export class ConselorPageModule {}
