import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';
import { SpeakersPage } from '../speakers/speakers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakersPage;

  mySelectedIndex: number;

  constructor(private navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
