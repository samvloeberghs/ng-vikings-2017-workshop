import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAnalyticsService } from 'angular-ga';

import { SessionDetailPage } from '../session-detail/session-detail';
import { URLService } from '../../shared/services';
import { Speaker, Session } from '../../shared/entities';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: Speaker;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private urlService: URLService,
              private ga: GoogleAnalyticsService) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session: Session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  openUrl(url: string) {
    this.urlService.open(url);
  }

  ionViewDidEnter() {
    this.ga.pageview.emit({
      page: `/speaker/${this.speaker.$key}`,
      title: `Speaker - ${this.speaker.name}`
    });
  }
}
