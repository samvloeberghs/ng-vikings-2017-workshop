import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  Loading,
  ItemSliding,
  List,
  NavController
} from 'ionic-angular';
import { GoogleAnalyticsService } from 'angular-ga';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
              private navCtrl: NavController,
              private confData: ConferenceDataService,
              private favoritesService: FavoritesService,
              private ga: GoogleAnalyticsService) {
    this.setupSubscriptions();
  }

  ionViewDidLoad() {
    this.updateSchedule();
  }

  ionViewDidEnter() {
    this.ga.pageview.emit({
      page: '/schedule'
    });
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

    this.groups$ = this.search$.switchMap((term: string) => {
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

    // TODO Close the loader when the data was loaded.
    // The closing should only be done once!
  }

  goToSessionDetail(session: Session) {
    // TODO Implement navigation to the session detail page
  }

  toggleFavorite({slidingItem, session}: ToggleResult) {
    if (session.favorited) {
      // TODO show confirmation box and ask if the user is sure that he wants to defavorite the session
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

    this.favoritesService.toggleFavorite(session).then(() => {
      // TODO show toast notification
      slidingItem.close();
    });

  }

  private presentLoader() {
    // TODO show loader
  }

  private closeLoader() {
    if (this.loader) {
      this.loader.dismissAll();
      this.loader = null;
    }
  }

}
