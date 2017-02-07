import { Component, ViewChild, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  LoadingController,
  Loading,
  App,
  ItemSliding,
  List,
  NavController
} from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/*
 To learn how to use third party libs in an
 Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
 */
// import moment from 'moment';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ConferenceDataService } from '../../shared/services';
import { Session, SessionGroup } from '../../shared/entities';
import { ToggleResult } from './entities';
import { FavoritesService } from '../../shared/services/favorites.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit {

  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  segment = 'all';
  groups: any = [];

  groups$: Observable<SessionGroup[]>;
  search$ = new BehaviorSubject<string>('');

  private loader: Loading;

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private app: App,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private confData: ConferenceDataService,
              private favoritesService: FavoritesService) {
  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule - ngVikings 2017');
    this.updateSchedule();
  }

  ngOnInit() {
    this.presentLoader();
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
              const show = this.segment === 'all' || (this.segment === 'favorites' && session.favorited);
              return show && session.title.toLowerCase().indexOf(term) !== -1;
            });
          }

          return filteredGroups.filter(group => group.sessions.length > 0);
        });
    });
    this.closeLoader();
  }

  goToSessionDetail(session: Session) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, session);
  }

  toggleFavorite({slidingItem, session}: ToggleResult) {
    if (session.favorited) {
      const alert = this.alertCtrl.create({
        title: 'Defavorite',
        message: 'Are you sure you would like to remove this session from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              slidingItem.close();
              return;
            }
          },
          {
            text: 'Yes, defavorite',
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

    this.presentLoader();
    this.favoritesService.toggleFavorite(session).then(() => {
      const toast = this.toastCtrl.create({
        message: session.favorited ? 'Session has been favorited' : 'Session has been defavorited',
        showCloseButton: true,
        closeButtonText: 'close',
        duration: 3000
      });
      toast.present();
      slidingItem.close();
      this.closeLoader();
    });

  }

  private presentLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  private closeLoader() {
    if (this.loader) {
      this.loader.dismissAll();
    }
  }

}
