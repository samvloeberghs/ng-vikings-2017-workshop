import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, App } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              private app: App) {
  }

  ionViewDidLoad() {
    this.app.setTitle('Login - ngVikings 2017');
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

}
