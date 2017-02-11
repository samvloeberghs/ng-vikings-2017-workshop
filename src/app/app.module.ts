import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { GoogleAnalyticsModule, GA_TOKEN } from 'angular-ga';

import { ConferenceApp } from './app.component';
import { firebaseConfig, trackingId } from './app.config.workshop';
import { TabsPage } from '../pages/tabs/tabs';
import { ScheduleModule } from '../pages/schedule';
import { SessionDetailModule } from '../pages/session-detail';
import { SpeakersModule } from '../pages/speakers';
import { SpeakerDetailPage } from '../pages/speaker-detail';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConferenceApp,
    TabsPage,
    SpeakerDetailPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
    AngularFireModule.initializeApp(firebaseConfig),
    SharedModule.forRoot(),
    GoogleAnalyticsModule.forRoot({
      provide: GA_TOKEN,
      useValue: trackingId
    }),
    ScheduleModule,
    SessionDetailModule,
    SpeakersModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    TabsPage,
    SpeakerDetailPage
  ],
  providers: [Storage]
})
export class AppModule {
}
