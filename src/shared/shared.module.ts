import { NgModule, ModuleWithProviders } from '@angular/core';

import { ConferenceDataService, URLService, ConnectionService } from './services';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ConferenceDataService,
        URLService,
        ConnectionService
      ]
    }
  }
}
