import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConselorPage } from './conselor.page';
import { ConselorPage as c} from '../room/conselor/conselor.page';
import { ComplainDetailPage } from '../modal/complain-detail/complain-detail.page';
import { ConselingDetailPage } from '../modal/conseling-detail/conseling-detail.page';
import { ChatConselorPage } from '../chat-conselor/chat-conselor.page';
// import { ChatRoomPage } from '../chat-room/chat-room.page';
// import { ChatRoomPage } from '../chat-room/chat-room.page';

const routes: Routes = [
  {
    path: '',
    component: ConselorPage
  }
];

@NgModule({
  entryComponents: [
    ComplainDetailPage,
    ConselingDetailPage,
    ChatConselorPage,
    c
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConselorPage, ComplainDetailPage, ConselingDetailPage, ChatConselorPage, c]
})
export class ConselorPageModule {}
