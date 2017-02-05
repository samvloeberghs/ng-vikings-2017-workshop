import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { SpeakerListPage } from './speaker-list';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';

@NgModule({
  imports: [
    IonicModule,
    SharedModule  
  ],
  declarations: [
    SpeakerListPage,
    SpeakerListComponent
  ],
  entryComponents: [
    SpeakerListPage
  ]
})
export class SpeakerListModule { } 