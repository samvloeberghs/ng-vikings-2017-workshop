import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

import { SessionGroup, Session } from '../../../shared/entities';
import { ToggleResult } from '../entities';

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.component.html'
})
export class SessionListComponent {
  @Input() groups: SessionGroup[];
  @Input() options = false;
  @Output() select = new EventEmitter<Session>();
  @Output() toggle = new EventEmitter<ToggleResult>();

  toggleFavorite(slidingItem: ItemSliding, session: Session) {
    this.toggle.emit({
      slidingItem,
      session
    });
  }
}
