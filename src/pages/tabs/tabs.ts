import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {HomePage} from '../home/home';
import {PredictorPage} from '../predictor/predictor';
import {StandingsPage} from '../standings/standings';
import {LoginPage} from '../login/login';
import {TournamentPage} from "../tournament/tournament";
import {AccountPage} from "../account/account";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = PredictorPage;
  tab3Root: any = TournamentPage;
  tab4Root: any = StandingsPage;
  tab5Root: any = AccountPage;
  tabs: any;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private plt: Platform) {
    this.plt.ready().then((readySource) => {
      this.checkLoggedIn();
    });
  }

  private checkLoggedIn() {
    this.storage.get("token").then((token) => {
      if (!token) {
        this.navCtrl.setRoot(LoginPage);
      }
    }, (error) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
