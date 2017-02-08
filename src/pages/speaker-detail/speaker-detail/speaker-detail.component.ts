import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Speaker, Session } from '../../../shared/entities';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'speaker-detail',
  templateUrl: 'speaker-detail.component.html'
})
export class SpeakerDetailComponent {
  @Input() speaker: Speaker;
  @Output() url = new EventEmitter<string>();
  @Output() session = new EventEmitter<Session>();

  showSessions = true;

  constructor(private navController: NavController,
              private viewController: ViewController) {

  }

  ngAfterViewInit() {
    this.showSessions = this.navController.indexOf(this.viewController) < 4;
  }

  ionViewDidLoad() {
    // doesn't work..
    // this.showSessions = this.navController.indexOf(this.viewController) < 4;
  }
}
