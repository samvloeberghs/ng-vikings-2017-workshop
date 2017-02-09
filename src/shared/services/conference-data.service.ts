// 3d party imports
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs';
import { Storage } from '@ionic/storage';

// app imports
import { Speaker, Session, SessionGroup } from '../entities';

@Injectable()
export class ConferenceDataService {

  rpSpeakers$ = new ReplaySubject<Speaker[]>();
  rpSessions$ = new ReplaySubject<Session[]>();
  rpSessionGroups$ = new ReplaySubject<SessionGroup[]>();

  private speakers$: Observable<Speaker[]> = this.loadEntity('speakers');
  private sessions$: Observable<Session[]> = this.loadEntity('sessions');

  // for every public stream we had to create a replay subject (otherwise it would only listen to it once)
  constructor(private af: AngularFire,
              private storage: Storage) {

    this.sessions$
      .map((sessions: Session[]) => {
        return sessions.map((session: any) => {
          this.prefetch(session.image);

          session.startDate = new Date(session.startDate);
          session.endDate = new Date(session.endDate);
          session.speakers = [];

          delete session.roomId;

          return session;
        });
      })
      .subscribe((sessions: Session[]) => {
        this.rpSessions$.next(sessions);
      });

    Observable.combineLatest(
      this.speakers$,
      this.rpSessions$,
      (speakers: Speaker[], sessions: Session[]): Speaker[] => {
        return speakers.map((speaker: any) => {
          this.prefetch(speaker.avatar);

          if (speaker.sessionIds) {
            speaker.sessions = speaker.sessionIds.map((x: number) => {
              const session = sessions[x];

              session.speakers.push(speaker);

              return session;
            });

            delete speaker.sessionIds;
          }

          return speaker;
        });
      }
    ).subscribe((speakers: Speaker[]) => {
      this.rpSpeakers$.next(speakers);
    });

    this.rpSessions$.subscribe((sessions: Session[]) => {
      const groups: SessionGroup[] = [];

      for (let i = 0; i < 24; i++) {
        const sessionsInGroup = sessions
          .filter(session => session.startDate.getHours() >= i && session.startDate.getHours() < (i + 1))
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

        if (sessionsInGroup.length > 0) {
          groups.push({
            startHour: i,
            endHour: (i + 1),
            sessions: sessionsInGroup
          });
        }
      }

      this.rpSessionGroups$.next(groups);
    });
  }

  private loadEntity(entity: string) {
    // TODO make this a hot observable
    return Observable.merge(
      this.loadRemoteEntity(entity),
      this.loadLocalEntity(entity)
    ).filter(Boolean);
  }

  private loadRemoteEntity(entity: string) {
    return this.af.database.list(entity)
      .do(result => {
        this.storage.set(entity, JSON.stringify(result));
      });
  }

  private loadLocalEntity(entity: string) {
    return this.storage.get(entity)
      .then(result => result && JSON.parse(result));
  }

  private prefetch(url: string) {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  }
}
