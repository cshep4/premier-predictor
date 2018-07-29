import {Component} from '@angular/core';

import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import Utils from "../../utils/utils";
import {StandingsService} from "../../providers/standings-service";
import {UserLeagueOverview} from "../../models/UserLeagueOverview";
import {OverallLeagueOverview} from "../../models/OverallLeagueOverview";
import {LeaguePage} from "../league/league";
import {DataProvider} from "../../providers/data-provider";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  leagues: any[];
  overallLeague: OverallLeagueOverview = new OverallLeagueOverview("Overall");
  loading: any;
  data: any;

  constructor(private navCtrl: NavController,
              private standingsService: StandingsService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private dataProvider: DataProvider,
              private adService: AdService,
              private firebaseAnalytics: FirebaseAnalytics) {
    this.adService.initAd();
  }

  ionViewDidEnter() {
    if (!this.leagues || Utils.refreshLeagues) {
      this.loadsUserLeagues();
    }

    if (this.dataProvider.league) {
      const league = this.dataProvider.league;
      this.dataProvider.league = null;
      this.navCtrl.push(LeaguePage, { 'league': league });
    }

    this.firebaseAnalytics.setCurrentScreen("Leagues");
    this.firebaseAnalytics.logEvent('page_view', {page: "Leagues"});
  }

  loadsUserLeagues(refresher?) {
    if (!refresher) {
      this.loading = Utils.showLoader('Loading User Leagues...', this.loadingCtrl);
    }
    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.standingsService.retrieveUserLeagues(token, userId).then((result) => {
          if (!refresher) {
            this.loading.dismiss();
          } else {
            refresher.complete();
          }
          this.data = result;

          this.leagues = this.data.body.userLeagues.map(l => <UserLeagueOverview>({
            leagueName: l.leagueName,
            pin: l.pin,
            rank: Utils.getRankWithSuffix(l.rank)
          }));

          this.overallLeague = <OverallLeagueOverview> ({
            leagueName: "Overall",
            rank: Utils.getRankWithSuffix(this.data.body.overallLeagueOverview.rank),
            userCount: this.data.body.overallLeagueOverview.userCount,
          });

          Utils.refreshLeagues = false;

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);
        }, (err) => {
          if (!refresher) {
            this.loading.dismiss();
          } else {
            refresher.complete();
          }
          Utils.presentToast("Error loading leagues", this.toastCtrl);
        });
      }, (error) => {
        Utils.presentToast("Error loading leagues", this.toastCtrl);
      });
    }, (error) => {
      Utils.presentToast("Error loading leagues", this.toastCtrl);
    });
  }

  openLeague(league) {
    this.navCtrl.push(LeaguePage, { 'league': league });
  }

  showLeaveLeaguePrompt(league) {
    const name = league.leagueName;
    const pin = league.pin;
    const prompt = this.alertCtrl.create({
      title: 'Leave ' + name + '?',
      message: "Are you sure you want to leave this league?",
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: data => {
            this.leaveLeague(pin);
          }
        }
      ]
    });
    prompt.present();
  }

  private leaveLeague(pin) {
    this.loading = Utils.showLoader('Leaving League...', this.loadingCtrl);

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.standingsService.leaveLeague(token, userId, pin).then((result) => {
          this.loading.dismiss();
          this.data = result;

          this.leagues = this.leagues.filter(function( obj ) {
            return obj.pin !== pin;
          });

          Utils.presentToast("League left!", this.toastCtrl);
          this.firebaseAnalytics.logEvent('left_league', {pin: pin, userId: userId});

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);
        }, (err) => {
          this.loading.dismiss();
          Utils.presentToast("Error leaving league", this.toastCtrl);
        });
      }, (error) => {
        Utils.presentToast("Error leaving league", this.toastCtrl);
      });
    }, (error) => {
      Utils.presentToast("Error leaving league", this.toastCtrl);
    });
  }

  showAddLeaguePrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add League',
      message: "Enter a name for the league",
      inputs: [
        {
          name: 'name',
          placeholder: 'League Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {
            const name = data.name;
            if(name == "") {
              this.showAddLeaguePrompt();
            } else {
              this.addLeague(name);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  private addLeague(name) {
    this.loading = Utils.showLoader('Adding League...', this.loadingCtrl);

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.standingsService.addLeague(token, userId, name).then((result) => {
          this.loading.dismiss();
          this.data = result;

          const newLeague = <UserLeagueOverview>({
            leagueName: this.data.body.name,
            pin: this.data.body.id,
            rank: Utils.getRankWithSuffix(1)
          });

          this.leagues.push(newLeague);

          Utils.presentToast("League added!", this.toastCtrl);
          this.firebaseAnalytics.logEvent('add_league', {pin: this.data.body.id, name: this.data.body.name, userId: userId});

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);
        }, (err) => {
          this.loading.dismiss();
          Utils.presentToast("Error creating league", this.toastCtrl);
        });
      }, (error) => {
        Utils.presentToast("Error creating league", this.toastCtrl);
      });
    }, (error) => {
      Utils.presentToast("Error creating league", this.toastCtrl);
    });
  }

  showJoinLeaguePrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Join League',
      message: "Enter the pin for the league you'd like to join",
      inputs: [
        {
          name: 'pin',
          placeholder: 'League Pin',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Join',
          handler: data => {
            const pin = data.pin;
            if(pin == "") {
              this.showJoinLeaguePrompt();
            } else {
              this.joinLeague(pin);
            }
          }
        }
      ]
    });

    prompt.present();
  }

  private joinLeague(pin) {
    this.loading = Utils.showLoader('Joining League...', this.loadingCtrl);

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.standingsService.joinLeague(token, userId, pin).then((result) => {
          this.loading.dismiss();
          this.data = result;

          const newLeague = <UserLeagueOverview>({
            leagueName: this.data.body.leagueName,
            pin: this.data.body.pin,
            rank: Utils.getRankWithSuffix(this.data.body.rank)
          });

          const currentLeaguesWithSamePin = this.leagues.filter(f => f.pin == newLeague.pin);

          if (!currentLeaguesWithSamePin || currentLeaguesWithSamePin.length == 0) {
            this.leagues.push(newLeague);
            this.leagues.sort(Utils.compareLeague);
          }

          Utils.presentToast("League joined!", this.toastCtrl);
          this.firebaseAnalytics.logEvent('join_league', {pin: this.data.body.id, userId: userId});

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);
        }, (err) => {
          this.loading.dismiss();
          Utils.presentToast("Error joining league", this.toastCtrl);
        });
      }, (error) => {
        Utils.presentToast("Error joining league", this.toastCtrl);
      });
    }, (error) => {
      Utils.presentToast("Error joining league", this.toastCtrl);
    });
  }
}
