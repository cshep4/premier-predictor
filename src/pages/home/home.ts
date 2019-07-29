import {Component, Inject} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import Utils from "../../utils/utils";
import MatchUtils from "../../utils/match-utils";
import {ScoreService} from "../../providers/score-service";
import {MatchService} from "../../providers/match-service";
import {UserLeagueOverview} from "../../models/UserLeagueOverview";
import {OverallLeagueOverview} from "../../models/OverallLeagueOverview";
import {StandingsService} from "../../providers/standings-service";
import {DataProvider} from "../../providers/data-provider";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/observable/interval';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpHeaders} from "@angular/common/http";
import {NotificationService} from "../../providers/notification-service";
import {MatchPage} from "../match/match";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {apiUrl} from "../../utils/urls";
import {LiveMatchService} from "../../providers/grpc/live";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  displayType;
  data: any;
  score: string;
  rank: string;
  scoreRetrievable = true;
  matchesRetrievable = true;
  leaguesRetrievable = true;
  rulesDropdown = {open: false};
  scoringDropdown = {open: false};
  upcomingMatches: any;
  leagues: any;
  liveUpdates: Map<String, Subscription> = new Map();
  toggleSection = Utils.toggleSection;

  private serverUrl = apiUrl + 'socket';
  private stompClient;
  private isConnected = false;

  constructor(private navCtrl: NavController,
              private scoreService: ScoreService,
              private storage: Storage,
              private matchService: MatchService,
              private standingsService: StandingsService,
              private dataProvider: DataProvider,
              @Inject('moment') private moment,
              private adService: AdService,
              private notificationService: NotificationService,
              private plt: Platform,
              private firebaseAnalytics: FirebaseAnalytics,
              private liveMatchService: LiveMatchService) {
    this.adService.initAd();
    this.displayType = "scoring";

    if (MatchUtils.refreshData) {
      this.score = null;
      this.rank = null;
    }

    if (!this.score || !this.rank) {
      this.plt.ready().then((readySource) => {
        this.loadData();
      });
    }

    this.plt.ready().then((readySource) => {
      this.notificationService.onNotificationClick(navCtrl);
    });
  }

  ionViewDidEnter() {
    this.firebaseAnalytics.setCurrentScreen("Home");
    this.firebaseAnalytics.logEvent('page_view', {page: "Home"});
  }

  private loadData(refresher?) {
    this.matchesRetrievable = true;
    this.leaguesRetrievable = true;
    this.loadScoreAndRank(refresher);
    this.loadUpcomingMatches(refresher);
    this.loadUserLeagues(refresher);
  }

  private loadScoreAndRank(refresher?) {
      this.storage.get('token').then((token) => {
          this.storage.get('userId').then((userId) => {
              this.scoreService.retrieveScoreAndRank(token, userId).then((result) => {
                  if (refresher) {
                    refresher.complete();
                  }

                  this.data = result;

                  this.score = "Pts: " + this.data.body.score;
                  // this.rank = "Rank: " + 0;//this.data.body.rank;
                  this.scoreRetrievable = true;

                  // let token = this.data.headers.get('X-Auth-Token');
                  // this.storage.set('token', token);
                }, (err) => {
                  if (refresher) {
                    refresher.complete();
                  }
                  this.scoreRetrievable = false;
              });
          }, (err) => {
            if (refresher) {
              refresher.complete();
            }
            this.scoreRetrievable = false;
          });
      }, (err) => {
        if (refresher) {
          refresher.complete();
        }
        this.scoreRetrievable = false;
      });
  }

  private loadUpcomingMatches(refresher?) {
    this.storage.get('token').then((token) => {
      this.liveMatchService.getUpcomingMatches(token);
      
      this.matchService.retrieveUpcomingMatches(token).then((result) => {
        if (refresher) {
          refresher.complete();
        }

        this.data = result;

        let matches = this.data.body;

        this.upcomingMatches = [];

        for (let key of Object.keys(matches)) {
          let value = matches[key];

          let dailyMatches = {
            date: key,
            matches: value
          };

          this.upcomingMatches.push(dailyMatches);
        }

        this.convertDateToLocalTime();

        this.notificationService.createNotifications(this.upcomingMatches);

        this.matchesRetrievable = true;

        if (!this.isConnected) {
          this.initializeWebSocketConnection();
        }

        // console.log(this.upcomingMatches);

        // let token = this.data.headers.get('X-Auth-Token');
        // this.storage.set('token', token);
      }, (err) => {
        if (refresher) {
          refresher.complete();
        }

        this.matchesRetrievable = false;
      });
    }, (err) => {
      if (refresher) {
        refresher.complete();
      }
      this.matchesRetrievable = false;
    });
  }

  convertDateToLocalTime() {
    for(let i=0; i<this.upcomingMatches.length; i++){
      for(let j=0; j<this.upcomingMatches[i].matches.length; j++) {
        this.upcomingMatches[i].matches[j].dateTime = this.toDateTime(this.upcomingMatches[i].matches[j]);
      }
    }
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
        self.stompClient.subscribe("/upcoming", (matches) => {
          if (matches.body) {
            const m: any[] = JSON.parse(matches.body);
            m.forEach((match) => { self.updateMatch(match); });
          }

          self.isConnected = true;
        }, headers);
      });
    });
  }

  private updateMatch(match) {
    for (let i = 0; i < this.upcomingMatches.length; i++) {
      for (let j = 0; j < this.upcomingMatches[i].matches.length; j++) {
        if (this.upcomingMatches[i].matches[j].id === match.id) {
          this.upcomingMatches[i].matches[j] = match;
          this.upcomingMatches[i].matches[j].dateTime = this.toDateTime(match);
        }
      }
    }
  }

  private loadUserLeagues(refresher?) {
    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.standingsService.retrieveUserLeagues(token, userId).then((result) => {
          if (refresher) {
            refresher.complete();
          }
          this.data = result;

          this.leagues = this.data.body.userLeagues.map(l => <UserLeagueOverview>({
            leagueName: l.leagueName,
            pin: l.pin,
            rank: Utils.getRankWithSuffix(l.rank)
          }));

          let overallLeague = <OverallLeagueOverview> ({
            leagueName: "Overall",
            rank: Utils.getRankWithSuffix(this.data.body.overallLeagueOverview.rank),
            userCount: this.data.body.overallLeagueOverview.userCount,
          });

          this.leagues.unshift(overallLeague);

          this.leaguesRetrievable = true;

          // let token = this.data.headers.get('X-Auth-Token');
          // this.storage.set('token', token);
        }, (err) => {
          if (refresher) {
            refresher.complete();
          }

          this.leaguesRetrievable = false;
        });
      }, (error) => {
        this.leaguesRetrievable = false;
      });
    }, (error) => {
      this.leaguesRetrievable = false;
    });
  }


  //---------- Methods only called from template - START

  private openLeague(league) {
    this.dataProvider.league = league;
    this.navCtrl.parent.select(3);
  }

  private getTeamName(name) {
    if (name == 'Wolverhampton Wanderers') {
      return 'Wolves';
    } else {
      return name;
    }
  }

  private getTimer(match) {
    if (match.status === "FT" || match.status === "HT") {
      return match.status;
    } else {
      return match.timer + "'";
    }
  }

  private goToStandingsPage() {
    this.navCtrl.parent.select(3);
  }

  private goToPredictorPage(match?) {
    if (match) {
      this.dataProvider.week = match.week;
    }
    this.navCtrl.parent.select(1);
  }

  private goToMatchPage(matchId) {
    console.log(matchId);
    this.navCtrl.push(MatchPage, { 'matchId': matchId });
  }

  //---------- Methods only called from template - END
}
