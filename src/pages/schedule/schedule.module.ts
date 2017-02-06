import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { SchedulePage } from './schedule';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionItemComponent } from './session-item/session-item.component';

@NgModule({
  imports: [
    IonicModule,
    SharedModule
  ],
  declarations: [
    SchedulePage,
    SessionListComponent,
    SessionItemComponent
  ],
  entryComponents: [
    SchedulePage
  ]
})
export class ScheduleModule { }
