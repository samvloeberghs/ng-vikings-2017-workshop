import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActionSheet, NavController } from 'ionic-angular';
import { GoogleAnalyticsService } from 'angular-ga';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { Speaker } from '../../shared/entities';
import { ConferenceDataService, URLService } from '../../shared/services';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html'
})
export class SpeakersPage {

  actionSheet: ActionSheet;
  speakers$: Observable<Speaker[]>;
  search$ = new BehaviorSubject<string>('');

  emptyState: boolean = false;

  constructor(private navCtrl: NavController,
              private confData: ConferenceDataService,
              private urlService: URLService,
              private ga: GoogleAnalyticsService) {
  }

  ionViewDidLoad() {
    this.speakers$ = this.confData.rpSpeakers$;

    this.speakers$ = this.search$.switchMap((term: string) => {
      term = typeof term === 'string' ? term.toLowerCase() : '';

      return this.confData.rpSpeakers$
        .map(speakers => {
          let hiddenSpeakers = 0;

          for (const speaker of speakers) {
            speaker.hidden = speaker.name.toLowerCase().indexOf(term) === -1;
            hiddenSpeakers++;
          }


          this.emptyState = speakers.length === hiddenSpeakers;


          return speakers;
        });
    });
  }

  ionViewDidEnter() {
    this.ga.pageview.emit({
      page: '/speakers'
    });
  }

  goToSpeakerDetail(speaker: Speaker) {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  openUrl(url: string) {
    this.urlService.open(url);
  }
}
