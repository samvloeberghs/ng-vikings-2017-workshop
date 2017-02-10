// 3d party imports
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs';
import { Storage } from '@ionic/storage';

// app imports
import { Speaker, Session, SessionGroup } from '../entities';

@Injectable()
export class ConferenceDataService {

  /**
   * You need 3 replaysubject:
   * 1) speakers
   * 2) sessions
   * 3) sessionGroups
   */

  /**
   * You need 2 observables, one for the speakers and one for the sessions
   */

  constructor(private af: AngularFire) {

    /**
     * Transforming the sessions:
     * Steps to follow
     * 1) map the sessions firebase data on your data in memory
     * 2) prefetch the image of the session
     * 3) transform the data
     * 4) push it on the replaySubject
     */

    /**
     * Mapping the speakers to the sessions, exposing the speakers
     * 1) combine the observables of speakers and sessions
     * 2) if a speaker has sessions, add the speaker to the session
     */

    /**
     * Mapping the sessions on sessionGroups
     * 1) subscribe to the sessions
     * 2) for every hour map all the sessions that session group
     * 3) only keep the group if there are sessions
     * 4) push it on the groups replaySubject
     */

  }

  /**
   * Takes the entity / table as parameter
   * @param entity:string
   */
  private loadEntity(entity: string) {
    // to implement
  }

  /**
   * Preloads and image by url by loading it in memory
   */
  private prefetch(url: string) {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  }
}
