import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;

  mySelectedIndex: number;

  constructor(private navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
