import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';

import { ConferenceApp } from './app.component';
import { firebaseConfig } from './app.firebase';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

// App Modules
import { ScheduleModule } from '../pages/schedule';
import { SpeakerListModule } from '../pages/speaker-list';
import { SpeakerDetailModule } from '../pages/speaker-detail';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
    AngularFireModule.initializeApp(firebaseConfig),
    SharedModule.forRoot(),
    ScheduleModule,
    SpeakerListModule,
    SpeakerDetailModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage
  ],
  providers: [ConferenceData, UserData, Storage]
})
export class AppModule { }
