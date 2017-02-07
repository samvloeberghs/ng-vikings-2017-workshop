import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

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
              private app: App) {
    this.speaker = this.navParams.data;
  }

  ionViewDidLoad() {
    this.app.setTitle(this.speaker.name + ' - Speakers - ngVikings 2017');
  }

  goToSessionDetail(session: Session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  openUrl(url: string) {
    this.urlService.open(url);
  }
}
