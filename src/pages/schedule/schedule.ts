import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  ToastController,
  LoadingController,
  Loading,
  ItemSliding,
  List,
  NavController
} from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
export class SchedulePage implements OnInit, OnDestroy {

  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  segment = 'all';
  groups: any = [];

  groups$: Observable<SessionGroup[]>;
  search$ = new BehaviorSubject<string>('');

  emptyState: boolean = false;

  private loader: Loading;
  private favorites: string[] = [];
  private disposables: Subscription[] = [];

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private confData: ConferenceDataService,
              private favoritesService: FavoritesService) {
    this.setupSubscriptions();
  }

  ionViewDidLoad() {
    this.updateSchedule();
  }

  ngOnInit() {
    this.presentLoader();
  }

  ngOnDestroy() {
    for (const disposable of this.disposables) {
      disposable.unsubscribe();
    }
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.groups$ = this.search$.switchMap(term => {
      term = typeof term === 'string' ? term.toLowerCase() : '';

      return this.confData.rpSessionGroups$
        .map(groups => {
          let hiddenGroups = 0;

          for (const group of groups) {
            let hiddenSessions = 0;

            for (const session of group.sessions) {
              session.favorited = this.favorites.indexOf(session.$key) !== -1;

              const hidden = this.segment === 'favorites' && !session.favorited;

              session.hidden = hidden || session.title.toLowerCase().indexOf(term) === -1;

              if (session.hidden) {
                hiddenSessions++;
              }
            }

            group.hidden = group.sessions.length === hiddenSessions;

            if (group.hidden) {
              hiddenGroups++;
            }
          }

          this.emptyState = groups.length === hiddenGroups;

          return groups;
        });
    });

    this.groups$.take(1).subscribe(() => {
      this.closeLoader();
    });
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

  private setupSubscriptions() {
    this.disposables.push(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favorites = favorites;

        this.updateSchedule();
      })
    );
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
      content: 'Please wait...'
    });
    this.loader.present();
  }

  private closeLoader() {
    if (this.loader) {
      this.loader.dismissAll();
      this.loader = null;
    }
  }

}
