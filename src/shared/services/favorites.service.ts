// 3d party imports
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritesService {

  // for every public stream we had to create a replay subject (otherwise it would only listen to it once)
  constructor(private storage: Storage) {

  }

}
