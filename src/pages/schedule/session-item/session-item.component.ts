import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

import { Session } from '../../../shared/entities';

@Component({
  selector: 'session-item',
  templateUrl: 'session-item.component.html'
})
export class SessionItemComponent {
  @Input() session: Session;
  @Input() options = false;
  @Output() select = new EventEmitter();
  @Output() toggle = new EventEmitter<ItemSliding>();
}
