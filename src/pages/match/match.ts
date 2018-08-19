import {AlertController, LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {Component, Inject} from "@angular/core";
import Utils, {apiUrl} from "../../utils/utils";
import {Clipboard} from "@ionic-native/clipboard";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpHeaders} from "@angular/common/http";
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
  userId: number;
  matchId: number;

  match: MatchFacts;
  prediction: Prediction;
  matchPredictionSummary: PredictionSummary;

  statsDropdown = {open: false};
  eventsDropdown = {open: false};
  commentaryDropdown = {open: false};
  lineupDropdown = {open: false};
  predictionDropdown = {open: false};

  private serverUrl = apiUrl + 'socket';
  private stompClient;
  private isConnected = false;

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
              private firebaseAnalytics: FirebaseAnalytics) {}

  ionViewDidLoad() {
    this.matchId = this.params.get('matchId');
    this.storage.get('userId').then((userId) => {
      this.userId = Number(userId);
    });
    this.adService.initAd();
    this.loadMatch();
  }

  ionViewWillUnload() {
    this.disconnectFromSubscription();
  }

  private disconnectFromSubscription() {
    if (this.isConnected) {
      this.stompClient.unsubscribe("/live/" + this.matchId);
      this.stompClient.disconnect();
    }

    this.isConnected = false;
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
            id: this.data.body.prediction.id,
            hGoals: this.data.body.prediction.hgoals,
            aGoals: this.data.body.prediction.agoals,
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

        if (!this.isConnected) {
          this.initializeWebSocketConnection();
        }

        if (refresher) {
          this.predictionDropdown.open = false;
        }

        console.log(this.match);

        let token = this.data.headers.get('X-Auth-Token');
        this.storage.set('token', token);
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

  private initializeWebSocketConnection() {
    this.storage.get('token').then((token) => {
      let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let self = this;

      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token);

      this.stompClient.connect({}, function (frame) {
        self.isConnected = true;
        self.stompClient.subscribe("/live/" + self.matchId, (matches) => {
          if (matches.body) {
            const m: any = JSON.parse(matches.body);
            self.updateMatch(m);
          }
        }, headers);
      });
    });
  }

  private updateMatch(match) {
    if (this.matchId === match.id) {
      this.match = <MatchFacts>({
        id: match.id,
        comp_id: match.comp_id,
        formatted_date: match.formatted_date,
        season: match.season,
        week: match.week,
        venue: match.venue,
        venue_id: match.venue_id,
        venue_city: match.venue_city,
        status: match.status,
        timer: match.timer,
        time: match.time,
        localteam_id: match.localteam_id,
        localteam_name: match.localteam_name,
        localteam_score: match.localteam_score,
        visitorteam_id: match.visitorteam_id,
        visitorteam_name: match.visitorteam_name,
        visitorteam_score: match.visitorteam_score,
        ht_score: match.ht_score,
        ft_score: match.ft_score,
        et_score: match.et_score,
        penalty_local: match.penalty_local,
        penalty_visitor: match.penalty_visitor,
        events: match.events,
        commentary: match.commentary
      });

      this.match.dateTime = this.toDateTime(this.match);
    }
  }

  getTimer(match) {
    if (match.status === "FT" || match.status === "HT") {
      return match.status;
    } else {
      return match.timer + "'";
    }
  }
}
