import {Component} from '@angular/core';

import {LoadingController, Platform, ToastController} from 'ionic-angular';
import Utils from "../../utils/utils";
import {TournamentService} from "../../providers/tournament-service";
import MatchUtils from "../../utils/match-utils";
import {AdMobFree} from "@ionic-native/admob-free";

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {
  standingsType;
  currentTables: any[];
  predictedTables: any[];
  loading: any;
  data: any;

  constructor(public tournamentService: TournamentService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public admob: AdMobFree,
              public plt: Platform) {
    this.standingsType = "current";

    let standings = [{
      name: "Group Stage",
      standings: null
    }, {
      name: "Knockout Stage",
      standings: null
    }];

    this.currentTables = JSON.parse(JSON.stringify(standings));
    this.predictedTables = JSON.parse(JSON.stringify(standings));
  }

  ionViewDidEnter() {
    Utils.showBanner(this.plt, this.admob);
    this.getStandings();
  }

  getStandings(refresher?) {
    if (this.standingsType == "current") {
      if (!this.currentTables[0].standings || refresher) {
        this.getCurrentLeagueTable(refresher);
      }
    } else {
      if (!this.predictedTables[0].standings || MatchUtils.refreshData  || refresher) {
        this.getPredictedLeagueTable(refresher);
      }
    }
  }

  getCurrentLeagueTable(refresher?) {
    if (!refresher) {
      this.loading = Utils.showLoader('Loading Current Standings...', this.loadingCtrl);
    }
    const token = localStorage.getItem('token');

    this.tournamentService.retrieveCurrentLeagueTable(token).then((result) => {
      if (!refresher) {
        this.loading.dismiss();
      } else {
        refresher.complete();
      }
      this.data = result;

      this.currentTables[0].standings = this.data.body.standings;
      this.currentTables[1].standings = this.data.body.knockoutStandings;
      this.currentTables[1].standings.forEach(m => this.convertDateToLocalTime(m));

      let token = this.data.headers.get('X-Auth-Token');
      localStorage.setItem('token', token);
    }, (err) => {
      if (!refresher) {
        this.loading.dismiss();
      } else {
        refresher.complete();
      }
      Utils.presentToast("Error loading standings", this.toastCtrl);
    });
  }

  getPredictedLeagueTable(refresher?) {
    if (!refresher) {
      this.loading = Utils.showLoader('Loading Predicted Standings...', this.loadingCtrl);
    }
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    this.tournamentService.retrievePredictedLeagueTable(token, userId).then((result) => {
      if (!refresher) {
        this.loading.dismiss();
      } else {
        refresher.complete();
      }
      this.data = result;

      this.predictedTables[0].standings = this.data.body.standings;
      this.predictedTables[1].standings = this.data.body.knockoutStandings;
      this.currentTables[1].standings.forEach(m => this.convertDateToLocalTime(m));
      MatchUtils.refreshData = false;

      let token = this.data.headers.get('X-Auth-Token');
      localStorage.setItem('token', token);
    }, (err) => {
      if (!refresher) {
        this.loading.dismiss();
      } else {
        refresher.complete();
      }
      Utils.presentToast("Error loading standings", this.toastCtrl);
    });
  }

  convertDateToLocalTime(round) {
    for(let i=0; i<round.matches.length; i++){
      const originalDate = round.matches[i].dateTime;
      round.matches[i].dateTime = MatchUtils.convertUTCDateToLocalDate(new Date(originalDate));
    }
  }
}
