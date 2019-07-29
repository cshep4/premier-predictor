import {Component} from '@angular/core';

import {LoadingController, NavController, Platform, ToastController} from 'ionic-angular';
import Utils from "../../utils/utils";
import MatchUtils from "../../utils/match-utils";
import {Storage} from "@ionic/storage";
import {MatchService} from "../../providers/match-service";
import {WheelSelector} from "@ionic-native/wheel-selector";
import {Match} from "../../models/Match";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {MatchPage} from "../match/match";

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {
  view;
  filterargs = {week : "Recent Matches"};
  week: any = "Recent Matches";
  loading: any;
  data: any;
  overlayHidden: boolean = true;
  matches: any;
  getTeamName = Utils.getTeamName;

  constructor(private matchService: MatchService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private plt: Platform,
              private storage: Storage,
              private selector: WheelSelector,
              private adService: AdService,
              private firebaseAnalytics: FirebaseAnalytics,
              private navCtrl: NavController) {
    this.view = "results";
    this.adService.initAd();
  }

  ionViewDidEnter() {
    this.getResults();

    this.firebaseAnalytics.setCurrentScreen("Results");
    this.firebaseAnalytics.logEvent('page_view', {page: "Results"});
  }

  private getResults(refresher?) {
    if (!this.matches || refresher) {
      this.loadResults(refresher);
    }
  }

  private loadResults(refresher?) {
    if (!refresher) {
      this.loading = Utils.showLoader('Loading Fixtures/Results...', this.loadingCtrl);
    }

    this.storage.get('token').then((token) => {
      this.matchService.retrieveMatches(token).then((result) => {
        Utils.dismissLoaders(this.loading, refresher);
        this.data = result;

        this.matches = this.data.body.map(m => <Match>({
          id: m.id,
          played: m.played,
          group: m.group,
          dateTime: m.dateTime,
          matchday: m.matchday,
          hTeam: m.hTeam,
          aTeam: m.aTeam,
          hGoals: m.hGoals,
          aGoals: m.aGoals
        }));

        this.convertDateToLocalTime();
        this.matches.sort(MatchUtils.compareDate);

        // let token = this.data.headers.get('X-Auth-Token');
        // this.storage.set('token', token);
      }, (err) => {
        Utils.dismissLoaders(this.loading, refresher);
        Utils.presentToast("Error loading fixtures/results, please try again", this.toastCtrl);
      });
    }, (error) => {
      Utils.dismissLoaders(this.loading, refresher);
      Utils.presentToast("Error loading fixtures/results, please try again", this.toastCtrl);
    });
  }

  private convertDateToLocalTime() {
    for(let i=0; i<this.matches.length; i++){
      const originalDate = this.matches[i].dateTime;
      this.matches[i].dateTime = new Date(originalDate);
    }
  }

  private selectWeek() {
    this.selector.show({
      title: "Matchday",
      defaultItems: [
        {
          index : 0,
          value: "Recent Matches"
        }
      ],
      items: [
        [
          {description: "Recent Matches"},
          {description: "Upcoming Matches"},
          {description: "1"},
          {description: "2"},
          {description: "3"},
          {description: "4"},
          {description: "5"},
          {description: "6"},
          {description: "7"},
          {description: "8"},
          {description: "9"},
          {description: "10"},
          {description: "11"},
          {description: "12"},
          {description: "13"},
          {description: "14"},
          {description: "15"},
          {description: "16"},
          {description: "17"},
          {description: "18"},
          {description: "19"},
          {description: "20"},
          {description: "21"},
          {description: "22"},
          {description: "23"},
          {description: "24"},
          {description: "25"},
          {description: "26"},
          {description: "27"},
          {description: "28"},
          {description: "29"},
          {description: "30"},
          {description: "31"},
          {description: "32"},
          {description: "33"},
          {description: "34"},
          {description: "35"},
          {description: "36"},
          {description: "37"},
          {description: "38"}
        ]
      ],
    }).then(
      result => {
        this.week = result[0].description;
        this.filterargs = {week: this.week};
      },
      err => console.log('Error: ', err)
    );
  }

  private incrementWeek() {
    if (this.week === "Recent Matches") {
      this.week = "Upcoming Matches";
    } else if (this.week === "Upcoming Matches") {
      this.week = 1;
    } else if (this.week != 38) {
      this.week++;
    }

    this.filterargs = {week : this.week};
  }

  private decrementWeek() {
    if (this.week == 1) {
      this.week = 'Upcoming Matches';
    } else if (this.week == "Upcoming Matches") {
      this.week = 'Recent Matches';
    } else if (this.week !== "Recent Matches") {
      this.week--;
    }

    this.filterargs = {week : this.week};
  }

  private jumpToCurrentWeek() {
    if (this.matches.filter(item => item.dateTime >= Date.now()).length == 0) {
      this.week = 38;
    } else {
      this.week = this.matches.filter(item => item.dateTime >= Date.now())[0].matchday;
    }
    this.filterargs = {week: this.week};
  }

  private toggleOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }

  private goToMatchPage(matchId) {
    this.navCtrl.push(MatchPage, { 'matchId': matchId });
  }
}
