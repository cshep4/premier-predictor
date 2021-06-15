import {AlertController, LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {Component, Inject} from "@angular/core";
import Utils from "../../utils/utils";
import {Clipboard} from "@ionic-native/clipboard";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {MatchService} from "../../providers/match-service";
import {MatchFacts} from "../../models/MatchFacts";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {Prediction} from "../../models/Prediction";
import {PredictionSummary} from "../../models/PredictionSummary";

@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage {
  loading: any;
  data: any;
  userId: string;
  matchId: string;

  match: MatchFacts;
  prediction: Prediction;
  matchPredictionSummary: PredictionSummary;
  // forms: any;

  statsDropdown = {open: false};
  eventsDropdown = {open: false};
  commentaryDropdown = {open: false};
  lineupDropdown = {open: false};
  predictionDropdown = {open: false};

  toggleSection = Utils.toggleSection;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private params: NavParams,
              private matchService: MatchService,
              private alertCtrl: AlertController,
              private clipboard: Clipboard,
              private storage: Storage,
              private adService: AdService,
              @Inject('moment') private moment,
              private firebaseAnalytics: FirebaseAnalytics) {
  }

  ionViewDidLoad() {
    this.matchId = this.params.get('matchId');
    this.storage.get('userId').then((userId) => {
      this.userId = userId;
    });
    this.adService.initAd();
    this.loadMatch();
  }

  ionViewDidEnter() {
    this.firebaseAnalytics.setCurrentScreen("Match");
    this.firebaseAnalytics.logEvent('page_view', {page: "Match", matchId: this.matchId});
  }

  private loadMatch(refresher?) {
    if (!refresher) {
      this.loading = Utils.showLoader('Loading Match Stats...', this.loadingCtrl);
    }

    this.storage.get('token').then((token) => {
      this.matchService.retrieveMatchSummary(token, this.matchId, this.userId).then((result) => {
        Utils.dismissLoaders(this.loading, refresher);
        this.data = result;
        console.log(this.data.body);

        if (this.data.body.prediction) {
          this.prediction = <Prediction>({
            hGoals: this.data.body.prediction.hGoals,
            aGoals: this.data.body.prediction.aGoals,
            userId: this.data.body.prediction.userId,
            matchId: this.data.body.prediction.matchId
          });
        } else {
          this.prediction = new Prediction();
          this.prediction.matchId = this.data.body.match.id;
          this.prediction.userId = this.userId;
        }

        this.matchPredictionSummary = <PredictionSummary>({
          homeWin: this.data.body.predictionSummary.homeWin,
          draw: this.data.body.predictionSummary.draw,
          awayWin: this.data.body.predictionSummary.awayWin
        });

        this.match = <MatchFacts>({
          id: this.data.body.match.id,
          comp_id: this.data.body.match.comp_id,
          formatted_date: this.data.body.match.formatted_date,
          season: this.data.body.match.season,
          week: this.data.body.match.week,
          venue: this.data.body.match.venue,
          venue_id: this.data.body.match.venue_id,
          venue_city: this.data.body.match.venue_city,
          status: this.data.body.match.status,
          timer: this.data.body.match.timer,
          time: this.data.body.match.time,
          localteam_id: this.data.body.match.localteam_id,
          localteam_name: this.data.body.match.localteam_name,
          localteam_score: this.data.body.match.localteam_score,
          visitorteam_id: this.data.body.match.visitorteam_id,
          visitorteam_name: this.data.body.match.visitorteam_name,
          visitorteam_score: this.data.body.match.visitorteam_score,
          ht_score: this.data.body.match.ht_score,
          ft_score: this.data.body.match.ft_score,
          et_score: this.data.body.match.et_score,
          penalty_local: this.data.body.match.penalty_local,
          penalty_visitor: this.data.body.match.penalty_visitor,
          events: this.data.body.match.events,
          commentary: this.data.body.match.commentary
        });

        this.match.dateTime = this.toDateTime(this.match);

        // this.forms = this.data.body.forms;

        if (refresher) {
          this.predictionDropdown.open = false;
        }

        console.log(this.match);

        // let token = this.data.headers.get('X-Auth-Token');
        // this.storage.set('token', token);
      }, (err) => {
        Utils.dismissLoaders(this.loading, refresher);
        Utils.presentToast("Error loading match data, please try again", this.toastCtrl);
      });
    }, (error) => {
      Utils.dismissLoaders(this.loading, refresher);
      Utils.presentToast("Error loading match data, please try again", this.toastCtrl);
    });
  }

  private toDateTime(match) {
    const dateTime = match.formatted_date + ' ' + match.time;
    return this.moment.utc(dateTime, 'DD.MM.YYYY HH:mm').format();
  }

  getTimer(match) {
    if (match.status === "FT" || match.status === "HT") {
      return match.status;
    } else {
      return match.timer + "'";
    }
  }
}
