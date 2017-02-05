import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Session } from '../../../shared/entities';

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.component.html'
})
export class SessionListComponent {
  @Input() sessions: Session[];
  @Output() select = new EventEmitter<Session>();
}
