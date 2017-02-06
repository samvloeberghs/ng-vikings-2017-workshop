import { Component, ViewChild } from '@angular/core';
import { AlertController, ToastController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserData } from '../../providers/user-data';
import { ConferenceDataService, ConnectionService } from '../../shared/services';
import { Session, SessionGroup } from '../../shared/entities';
import { ToggleResult } from './entities';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  groups$: Observable<SessionGroup[]>;
  search$ = new BehaviorSubject<string>('');

  private isAuthenticated = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private app: App,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private confData: ConferenceDataService,
    private connectionService: ConnectionService,
    private user: UserData
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.groups$ = this.search$.switchMap(term => {
      term = typeof term === 'string' ? term.toLowerCase() : '';

      return this.confData.rpSessionGroups$
        .map(groups => {
          const filteredGroups: SessionGroup[] = groups.map(group => Object.assign({}, group));

          for (const group of filteredGroups) {
            group.sessions = group.sessions.filter(session => {
              const show = this.segment === 'all' || this.user.hasFavorite(session.title);

              return show && session.title.toLowerCase().indexOf(term) !== -1;
            });
          }

          return filteredGroups.filter(group => group.sessions.length > 0);
        });
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(session: Session) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, session);
  }

  toggleFavorite({slidingItem, session}: ToggleResult) {
    if (this.user.hasFavorite(session.title)) {
      const alert = this.alertCtrl.create({
        title: 'Defavorite',
        message: 'Would you like to remove this session from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              slidingItem.close();
              return;
            }
          },
          {
            text: 'Defavorite',
            handler: () => {
              this.toggleFavoriteToast(session, slidingItem);
            }
          }
        ]
      });

      // now present the alert on top of all other content
      alert.present();
    } else {
      this.toggleFavoriteToast(session, slidingItem);
    }
  }

  private toggleFavoriteToast(session: Session, slidingItem: ItemSliding) {
    const isFavorite = this.user.hasFavorite(session.title);

    if (!this.connectionService.isConnected()) {
      const toast = this.toastCtrl.create({
        message: `You need an internet connection to ${isFavorite ? 'defavorite' : 'favorite'} the session.`,
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
    } else if (this.isAuthenticated) {
      // if (!isFavorite) {
      //   this.conferenceData.setFavorite(session.$key);
      // } else {
      //   this.conferenceData.removeFavorite(session.favorite.$key);
      //   delete session.favorite;
      // }

      // TODO add favorite to Firebase, see code ^^
      if (!isFavorite) {
        this.user.addFavorite(session.title);
      } else {
        this.user.removeFavorite(session.title);
      }

      const toast = this.toastCtrl.create({
        message: isFavorite ? 'Session has been favorited' : 'Session has been defavorited',
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Not logged in',
        message: 'You need to be logged in to favorite the session.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Go to login',
            handler: () => {
              this.navCtrl.push(LoginPage);
              alert.dismiss();
            }
          }
        ]
      });

      // now present the alert on top of all other content
      alert.present();
    }

    slidingItem.close();
  }
}
