import {Component} from '@angular/core';

import {LoadingController, Platform, ToastController} from 'ionic-angular';
import {MatchService} from "../../providers/match-service";
import MatchUtils from "../../utils/match-utils";
import Utils from "../../utils/utils";
import {Prediction} from "../../models/Prediction";
import {WheelSelector} from "@ionic-native/wheel-selector";
import {DataProvider} from "../../providers/data-provider";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {PredictedMatch} from "../../models/PredictedMatch";

@Component({
  selector: 'page-predictor',
  templateUrl: 'predictor.html'
})
export class PredictorPage {
  matches: any;
  forms: any;
  loading: any;
  data: any;
  filterargs = {week : "Upcoming Matches"};
  week: any = "Upcoming Matches";
  predictions: [Prediction];
  overlayHidden: boolean = true;
  view = "predictions";
  getTeamName = Utils.getTeamName;
  getPointsAwarded = Utils.getPointsAwarded;

  constructor(private matchService: MatchService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private plt: Platform,
              private selector: WheelSelector,
              private storage: Storage,
              private dataProvider: DataProvider,
              private adService: AdService,
              private firebaseAnalytics: FirebaseAnalytics) {
    this.adService.initAd();
    if (!this.matches) {
      this.loadMatchesWithPredictions();
    }
  }

  ionViewDidEnter() {
    if (this.dataProvider.week) {
      const week = this.dataProvider.week;
      this.dataProvider.week = null;

      this.week = week;
      this.filterargs = {week: week};
    }
    this.selector.hideSelector();


    this.firebaseAnalytics.setCurrentScreen("Predictor");
    this.firebaseAnalytics.logEvent('page_view', {page: "Predictor"});
  }

  toggleOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }

  selectGoals(match, teamName, isHome) {
    let title = "Goals for " + this.getTeamName(teamName);
    if (!this.hasDatePassed(match.dateTime)) {
      this.selector.show({
        title: title,
        items: [
          [
            {description: "0"},
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
            {description: "15"}
          ]
        ],
      }).then(
        result => {
          if (isHome) {
            match.hGoals = result[0].description;
          } else {
            match.aGoals = result[0].description;
          }
        },
        err => console.log('Error: ', err)
      );
    }
  }

  loadMatchesWithPredictions(refresher?) {
      if (!refresher) {
          this.loading = Utils.showLoader('Loading Predictions...', this.loadingCtrl);
      }
      this.storage.get('token').then((token) => {
        this.storage.get('userId').then((userId) => {
          this.matchService.retrievePredictedMatches(token, userId).then((result) => {
            Utils.dismissLoaders(this.loading, refresher);
            this.data = result;
            this.matches = this.data.body.predictions.map(m => <PredictedMatch>({
              id: m.id,
              played: m.played,
              group: m.group,
              dateTime: m.dateTime,
              matchday: m.matchday,
              hTeam: m.hTeam,
              aTeam: m.aTeam,
              hGoals: m.hGoals,
              aGoals: m.aGoals,
              hResult: m.hResult,
              aResult: m.aResult
            }));
            this.convertDateToLocalTime();
            this.matches.sort(MatchUtils.compareDate);

            if (this.data.body.forms != null) {
              this.forms = this.data.body.forms;
            }

            // let token = this.data.headers.get('X-Auth-Token');
            // this.storage.set('token', token);
          }, (err) => {
            Utils.dismissLoaders(this.loading, refresher);
            Utils.presentToast("Error loading predictions, please try again", this.toastCtrl);
          });
        }, (error) => {
          Utils.dismissLoaders(this.loading, refresher);
          Utils.presentToast("Error loading predictions, please try again", this.toastCtrl);
        });
      }, (error) => {
        Utils.dismissLoaders(this.loading, refresher);
        Utils.presentToast("Error loading predictions, please try again", this.toastCtrl);
      });
  }

  convertDateToLocalTime() {
      for(let i=0; i<this.matches.length; i++){
          const originalDate = this.matches[i].dateTime;
          this.matches[i].dateTime = new Date(originalDate);
      }
  }

  save() {
      this.loading = Utils.showLoader('Saving Predictions...', this.loadingCtrl);
      this.storage.get('token').then((token) => {
        this.storage.get('userId').then((userId) => {
          this.predictions = this.matches
            .filter(m => m.hGoals !== undefined && m.aGoals !== undefined)
            .filter(m => m.hGoals !== null && m.aGoals !== null)
            .filter(m => m.hGoals !== '' && m.aGoals !== '')
            .filter(m => !isNaN(m.hGoals) && !isNaN(m.aGoals))
            .map(m => <Prediction>({
                hGoals: Number(m.hGoals),
                aGoals: Number(m.aGoals),
                userId: userId,
                matchId: m.id
            }));

          this.matchService.savePredictions(token, this.predictions).then((result) => {
              this.loading.dismiss();
              Utils.presentToast("Predictions stored successfully!", this.toastCtrl);
              this.firebaseAnalytics.logEvent('save_predictions', {numPredictions: this.predictions.length});
              MatchUtils.refreshData = true;

              this.data = result;

              // const token = this.data.headers.get('X-Auth-Token');
              // this.storage.set('token', token);
          }, (err) => {
              this.loading.dismiss();
              Utils.presentToast("Error saving predictions, please try again", this.toastCtrl);
          });
        }, (error) => {
          this.loading.dismiss();
          Utils.presentToast("Error saving predictions, please try again", this.toastCtrl);
        });
      }, (error) => {
        this.loading.dismiss();
        Utils.presentToast("Error saving predictions, please try again", this.toastCtrl);
      });
  }

  private hasPredictionBeenAdded(prediction) {
    return this.data.body.filter(p => p.matchId == prediction.id).length != 0
  }

  hasDatePassed(dateTime) {
      return Date.parse(dateTime) < Date.now();
  }

  private selectWeek() {
    this.selector.show({
      title: "Matchday",
      defaultItems: [
        {
          index : 0,
          value: "Upcoming Matches"
        }
      ],
      items: [
        [
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
    if (this.week === "Upcoming Matches") {
      this.week = 1;
    } else if (this.week != 38) {
      this.week++;
    }

    this.filterargs = {week : this.week};
  }

  private decrementWeek() {
    if (this.week == 1) {
      this.week = 'Upcoming Matches';
    } else if (this.week !== "Upcoming Matches") {
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
}
