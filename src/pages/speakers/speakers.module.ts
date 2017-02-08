import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { SpeakersPage } from './speakers';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';

@NgModule({
  imports: [
    IonicModule,
    SharedModule  
  ],
  declarations: [
    SpeakersPage,
    SpeakerListComponent
  ],
  entryComponents: [
    SpeakersPage
  ]
})
export class SpeakersModule { }