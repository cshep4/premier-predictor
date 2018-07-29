import {Component, Input, OnChanges, SimpleChanges, ViewChild} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";
import {PredictionSummary} from "../../models/PredictionSummary";
import {Prediction} from "../../models/Prediction";
import {Chart} from 'chart.js';
import Utils from "../../utils/utils";
import {WheelSelector} from "@ionic-native/wheel-selector";
import MatchUtils from "../../utils/match-utils";
import {LoadingController, ToastController} from "ionic-angular";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {Storage} from "@ionic/storage";
import {MatchService} from "../../providers/match-service";

@Component({
  selector: 'match-prediction-summary',
  templateUrl: 'match-prediction-summary.html'
})
export class MatchPredictionSummary implements OnChanges {
  @Input() matchPredictionSummary: PredictionSummary;
  @Input() prediction: Prediction;
  @Input() dateTime : Date;
  @Input() hTeam : string;
  @Input() aTeam : string;

  @ViewChild('pieCanvas') pieCanvas;
  pieChart: any;

  getTeamName = Utils.getTeamName;

  loading: any;
  data: any;

  constructor(private selector: WheelSelector,
              private matchService: MatchService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private firebaseAnalytics: FirebaseAnalytics) {}

  ngAfterViewInit() {
    this.setupPieChart(this.matchPredictionSummary);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.matchPredictionSummary.previousValue && changes.matchPredictionSummary.previousValue != changes.matchPredictionSummary.currentValue) {
      const summary = changes.matchPredictionSummary.currentValue;
      this.pieChart.data = {
        labels: ["Home Win", "Draw", "Away Win"],
        datasets: [{
          label: '# of Predictions',
          data: [summary.homeWin, summary.draw, summary.awayWin],
          backgroundColor: [
            'rgba(233, 0, 82, 0.5)',
            'rgba(0, 255, 133, 0.5)',
            'rgba(4, 245, 255, 0.5)'
          ],
          hoverBackgroundColor: [
            "#e90052",
            "#00ff85",
            "#04f5ff"
          ]
        }]
      };
      this.pieChart.update();
    }
  }

  setupPieChart(predictionSummary) {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {

      type: 'pie',
      data: {
        labels: ["Home Win", "Draw", "Away Win"],
        datasets: [{
          label: '# of Predictions',
          data: [predictionSummary.homeWin, predictionSummary.draw, predictionSummary.awayWin],
          backgroundColor: [
            'rgba(233, 0, 82, 0.5)',
            'rgba(0, 255, 133, 0.5)',
            'rgba(4, 245, 255, 0.5)'
          ],
          hoverBackgroundColor: [
            "#e90052",
            "#00ff85",
            "#04f5ff"
          ]
        }]
      }

    });
  }

  save() {
    this.loading = Utils.showLoader('Saving Prediction...', this.loadingCtrl);
    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {

        if (!this.isScoreValid(this.prediction.hGoals) || !this.isScoreValid(this.prediction.aGoals)) {
          Utils.presentToast("Prediction not valid, please try again", this.toastCtrl);
          this.loading.dismiss();
          return;
        }

        const predictions = [this.prediction];

        this.matchService.savePredictions(token, predictions).then((result) => {
          this.loading.dismiss();
          Utils.presentToast("Prediction stored successfully!", this.toastCtrl);
          this.firebaseAnalytics.logEvent('save_predictions', {numPredictions: 1});
          MatchUtils.refreshData = true;

          this.data = result;

          this.prediction.id = this.data.body[0].id;

          const token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);
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

  private isScoreValid(score) {
    return score !== undefined && score !== null && score !== '' && !isNaN(score);
  }

  selectGoals(teamName, isHome) {
    let title = "Goals for " + this.getTeamName(teamName);
    if (!this.hasDatePassed(this.dateTime)) {
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
            this.prediction.hGoals = result[0].description;
          } else {
            this.prediction.aGoals = result[0].description;
          }
        },
        err => console.log('Error: ', err)
      );
    }
  }

  hasDatePassed(dateTime) {
    return Date.parse(dateTime) < Date.now();
  }
}
