import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, MenuController, Nav, App, IonicApp, ToastController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakersPage } from '../pages/speakers/speakers';
import { ConnectionService } from '../shared/services';

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
  appPages: PageInterface[] = [
    {title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar'},
    {title: 'Speakers', component: TabsPage, tabComponent: SpeakersPage, index: 1, icon: 'contacts'},
  ];
  rootPage: any = TabsPage;

  private innerNavCtrl: any;
  private wasOffline = false;

  constructor(private events: Events,
              private menu: MenuController,
              private toast: ToastController,
              private app: App,
              private ionicApp: IonicApp,
              private connection: ConnectionService) {
  }

  ngOnInit() {
    this.setupBackButtonBehavior();

    this.connection.connection$.subscribe((isConnected: boolean) => {
      let message: string;

      if (!isConnected) {
        this.wasOffline = true;
        message = 'Connection lost';
      } else if (this.wasOffline) {
        message = 'Connection reestablished';
      }

      if (message) {
        const toast = this.toast.create({
          message,
          duration: 5000,
          showCloseButton: true
        });

        toast.present();
      }
    });
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
