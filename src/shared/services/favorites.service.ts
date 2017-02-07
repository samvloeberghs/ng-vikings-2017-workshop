// 3d party imports
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Session } from '../entities/session';

@Injectable()
export class FavoritesService {

  constructor(private storage: Storage) {

  }

  checkFavorite(session: Session) {
    this.storage.get('favorites').then(favoritesJson => {
      try {
        let favorites: [string] = JSON.parse(favoritesJson);
        const favoriteIdx = favorites.indexOf(session.$key);
        session.favorited = (favoriteIdx > -1);
      }
      catch (e) {
        console.log('No favorites set yet');
        session.favorited = false;
      }
    });
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
          session.favorited = !session.favorited;
          resolve(true);
        });
      });
    });
  }

}
