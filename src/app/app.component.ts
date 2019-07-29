import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Splashscreen} from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import {TabsPage} from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform,
              private statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.hideSplashScreen();
    });
  }

  private hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }
}
