import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { App, ActionSheet, NavController } from 'ionic-angular';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { Speaker } from '../../shared/entities';
import { ConferenceDataService, URLService } from '../../shared/services';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers$: Observable<Speaker[]>;

  constructor(private navCtrl: NavController,
              private confData: ConferenceDataService,
              private urlService: URLService,
              private app: App) { }

  ionViewDidLoad() {
    this.app.setTitle('Speakers - ngVikings 2017');
    this.speakers$ = this.confData.rpSpeakers$;
  }

  goToSpeakerDetail(speaker: Speaker) {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  openUrl(url: string) {
    this.urlService.open(url);
  }
}
