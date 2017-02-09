import { Component } from '@angular/core';
import {
  NavParams, NavController, ToastController, AlertController, LoadingController,
  Loading
} from 'ionic-angular';
import { GoogleAnalyticsService } from 'angular-ga';

import { SpeakerDetailPage } from '../speaker-detail';
import { Session, Speaker } from '../../shared/entities';
import { FavoritesService } from '../../shared/services/favorites.service';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {

  session: Session;
  private loader: Loading;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private favoritesService: FavoritesService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private ga: GoogleAnalyticsService) {
    this.session = navParams.data;
  }

  toggleFavorite() {
    if (this.session.favorited) {
      const alert = this.alertCtrl.create({
        title: 'Defavorite',
        message: 'Are you sure you would like to remove this session from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return;
            }
          },
          {
            text: 'Yes, defavorite',
            handler: () => {
              this.toggleFavoriteToast();
            }
          }
        ]
      });

      // now present the alert on top of all other content
      alert.present();
    } else {
      this.toggleFavoriteToast();
    }
  }

  goToSpeakerDetail(speaker: Speaker) {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  ionViewDidEnter() {
    this.ga.pageview.emit({
      page: `/session/${this.session.$key}`,
      title: `Session - ${this.session.title}`
    });
  }

  private toggleFavoriteToast() {

    this.presentLoader();
    this.favoritesService.toggleFavorite(this.session).then(() => {
      const toast = this.toastCtrl.create({
        message: this.session.favorited ? 'Session has been favorited' : 'Session has been defavorited',
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
      this.closeLoader();
    });

  }

  private presentLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }

  private closeLoader() {
    if (this.loader) {
      this.loader.dismissAll();
    }
  }

}
