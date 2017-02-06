import { Component, Input } from '@angular/core';

import { Session } from '../../../shared/entities';

@Component({
  selector: 'session-info',
  templateUrl: 'session-info.component.html'
})
export class SessionInfoComponent {
  @Input() session: Session;
}
