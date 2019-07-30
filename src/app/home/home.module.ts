import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ResultConselingPage } from '../modal/result-conseling/result-conseling.page';
import { ChatRoomPage } from '../chat-room/chat-room.page';
import { PatientPage } from '../room/patient/patient.page';

@NgModule({
  entryComponents: [
    ResultConselingPage,
    ChatRoomPage,
    PatientPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ResultConselingPage, ChatRoomPage, PatientPage]
})
export class HomePageModule {}
