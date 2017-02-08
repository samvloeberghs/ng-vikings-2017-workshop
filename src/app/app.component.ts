import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, MenuController, Nav, App, IonicApp } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakersPage } from '../pages/speakers/speakers';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp implements OnInit {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    {title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar'},
    {title: 'Speakers', component: TabsPage, tabComponent: SpeakersPage, index: 1, icon: 'contacts'},
  ];
  loggedInPages: PageInterface[] = [
    {title: 'Logout', component: TabsPage, icon: 'log-out', logsOut: true}
  ];
  loggedOutPages: PageInterface[] = [
    {title: 'Login', component: LoginPage, icon: 'log-in'}
  ];
  rootPage: any = TabsPage;

  private innerNavCtrl: any;

  constructor(private events: Events,
              private menu: MenuController,
              private app: App,
              private ionicApp: IonicApp) {
  }

  ngOnInit() {
    this.initApplication();
    this.setupBackButtonBehavior();
  }


  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log(`Didn't set nav root`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        // do logout
      }, 1000);
    }
  }


  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

  private initApplication() {
    this.listenToLoginEvents();
  }

  private listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  private setupBackButtonBehavior() {

    // If on web version (browser)
    if (window.location.protocol !== 'file:') {

      // Listen to browser pages
      this.events.subscribe('navController:current', (navCtrlData: any) => {
        this.innerNavCtrl = navCtrlData[0];
      });

      // Register browser back button action(s)
      window.onpopstate = (evt) => {

        // Close menu if open
        if (this.menu.isOpen()) {
          this.menu.close();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          //this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back on main active nav if there's a page loaded
        if (this.app.getActiveNav().canGoBack()) {
          this.app.getActiveNav().pop();
        } else {
          // Navigate back on subloaded nav if notified
          if (this.innerNavCtrl && this.innerNavCtrl.canGoBack()) {
            this.innerNavCtrl.pop();

          }
        }

      };

      // Fake browser history on each view enter
      this.app.viewDidEnter.subscribe(() => {
        history.pushState(null, null, '');
      });

    }

  }

}
