import { Component } from '@angular/core';
import { NavParams, NavController, App } from 'ionic-angular';

import { SpeakerDetailPage } from '../speaker-detail';
import { Session, Speaker } from '../../shared/entities';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: Session;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private app: App) {
    this.session = navParams.data;
  }

  ionViewDidLoad() {
    this.app.setTitle(this.session.title + ' - Sessions - ngVikings 2017');
  }

  toggleFavorite() {
    console.log('TODO implement toggling');
  }

  goToSpeakerDetail(speaker: Speaker) {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }
}
