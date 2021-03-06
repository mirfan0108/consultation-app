import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule } from 'ion2-calendar';
import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule.page';
import { CategoryPipe } from '../pipes/category.pipe';
import { SchedulePatientPage } from '../modal/schedule-patient/schedule-patient.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  }
];

@NgModule({
  entryComponents: [
    SchedulePatientPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchedulePage, SchedulePatientPage]
})
export class SchedulePageModule {}
