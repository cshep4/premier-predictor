import {Component} from '@angular/core';

import {LoadingController, NavParams, Platform, ToastController} from 'ionic-angular';
import Utils from "../../utils/utils";
import MatchUtils from "../../utils/match-utils";
import {MatchService} from "../../providers/match-service";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {PredictedMatch} from "../../models/PredictedMatch";

@Component({
  selector: 'page-predictions-summary',
  templateUrl: 'prediction-summary.html'
})
export class PredictionSummaryPage {
  predictions: any[];
  loading: any;
  data: any;
  userId: string;
  firstName: String;
  score: Number;
  view: any ="results";

  constructor(private matchService: MatchService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private plt: Platform,
              private storage: Storage,
              private params: NavParams,
              private adService: AdService,
              private firebaseAnalytics: FirebaseAnalytics) {

    this.firstName = this.params.get('firstName');
    this.userId = this.params.get('userId');
    this.score = this.params.get('score');

    this.adService.initAd();
  }

  ionViewDidEnter() {
    this.getPredictionSummary();

    this.firebaseAnalytics.setCurrentScreen("Prediction Summary");
    this.firebaseAnalytics.logEvent('page_view', {page: "Prediction Summary"});
  }

  getPredictionSummary(refresher?) {
    if (!refresher) {
      this.loading = Utils.showLoader('Loading Prediction Summary...', this.loadingCtrl);
    }
    this.storage.get('token').then((token) => {
      this.matchService.retrievePredictionSummary(token, this.userId).then((result) => {
        Utils.dismissLoaders(this.loading, refresher);
        this.data = result;

        console.log(this.data.body.matches);

        this.predictions = this.data.body.matches.map(m => <PredictedMatch>({
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
        this.predictions.sort(MatchUtils.compareDate);

        // let token = this.data.headers.get('X-Auth-Token');
        // this.storage.set('token', token);
      }, (err) => {
        Utils.dismissLoaders(this.loading, refresher);
        Utils.presentToast("Error loading predictions, please try again", this.toastCtrl);
      });
    }, (err) => {
      Utils.dismissLoaders(this.loading, refresher);
      Utils.presentToast("Error loading predictions, please try again", this.toastCtrl);
    });
  }

  private convertDateToLocalTime() {
    for(let i=0; i<this.predictions.length; i++) {
      const originalDate = this.predictions[i].dateTime;
      this.predictions[i].dateTime = new Date(originalDate);
    }
  }
}
