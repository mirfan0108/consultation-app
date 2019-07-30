import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComplaintPage } from './complaint.page';
import { CategoryPipe } from '../pipes/category.pipe';
import { ComplaintStatusPage } from '../modal/complaint-status/complaint-status.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintPage
  }
];

@NgModule({
  entryComponents: [
    ComplaintStatusPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComplaintPage, CategoryPipe, ComplaintStatusPage]
})
export class ComplaintPageModule {}
