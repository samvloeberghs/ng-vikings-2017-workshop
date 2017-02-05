import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Speaker, Session } from '../../../shared/entities';

@Component({
  selector: 'speaker-detail',
  templateUrl: 'speaker-detail.component.html'
})
export class SpeakerDetailComponent {
  @Input() speaker: Speaker;
  @Output() url = new EventEmitter<string>();
  @Output() session = new EventEmitter<Session>();
}
