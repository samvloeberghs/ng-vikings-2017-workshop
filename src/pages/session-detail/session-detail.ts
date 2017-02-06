import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { SpeakerDetailPage } from '../speaker-detail';
import { Session, Speaker } from '../../shared/entities';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: Session;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.session = navParams.data;
  }

  toggleFavorite() {
    console.log('TODO implement toggling');
  }

  goToSpeakerDetail(speaker: Speaker) {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }
}
