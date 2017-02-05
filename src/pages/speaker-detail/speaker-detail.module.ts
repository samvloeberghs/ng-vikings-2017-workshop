import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { SpeakerDetailPage } from './speaker-detail';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';
import { SessionListComponent } from './session-list/session-list.component';

@NgModule({
  imports: [
    IonicModule,
    SharedModule
  ],
  declarations: [
    SpeakerDetailPage,
    SpeakerDetailComponent,
    SessionListComponent
  ],
  entryComponents: [
    SpeakerDetailPage
  ]
})
export class SpeakerDetailModule { }
