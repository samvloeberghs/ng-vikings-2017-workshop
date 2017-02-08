import { NgModule, ModuleWithProviders } from '@angular/core';

import { ConferenceDataService, URLService, ConnectionService, FavoritesService } from './services';
import { TimezoneDatePipe } from './pipes/timezone-date.pipe';

@NgModule({
  declarations: [TimezoneDatePipe],
  exports: [TimezoneDatePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ConferenceDataService,
        URLService,
        FavoritesService,
        ConnectionService
      ]
    }
  }
}
