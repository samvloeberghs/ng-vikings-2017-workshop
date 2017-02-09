import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Session } from '../entities/session';

@Injectable()
export class FavoritesService {

  favorites$ = new ReplaySubject<string[]>();

  constructor(private storage: Storage) {
    try {
      this.storage.get('favorites')
        .then(JSON.parse)
        .then(favorites => {
          this.favorites$.next(favorites || []);
        });
    } catch (err) {
      this.favorites$.next([]);
    }
  }

  toggleFavorite(session: Session): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('favorites').then(favoritesJson => {
        let favorites: [string];
        try {
          favorites = JSON.parse(favoritesJson);
          const favoriteIdx = favorites.indexOf(session.$key);
          if (favoriteIdx > -1) {
            favorites.splice(favoriteIdx, 1);
          } else {
            favorites.push(session.$key);
          }
        }catch(e){
          favorites = [session.$key];
        }
        this.storage.set('favorites', JSON.stringify(favorites)).then(() => {
          this.favorites$.next(favorites);
          resolve(true);
        });
      });
    });
  }

}
