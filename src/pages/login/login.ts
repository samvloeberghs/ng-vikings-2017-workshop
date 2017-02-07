import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, App } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(private navCtrl: NavController) {
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.navCtrl.push(TabsPage);
    }
  }

}
