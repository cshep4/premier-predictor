import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {StandingsPage} from '../pages/standings/standings';
import {HomePage} from '../pages/home/home';
import {PredictorPage} from '../pages/predictor/predictor';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {GroupPopover} from '../components/group-popover/group-popover';
import {AuthService} from '../providers/auth-service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {TournamentPage} from "../pages/tournament/tournament";
import {AccountPage} from "../pages/account/account";
import {MatchService} from "../providers/match-service";
import {GroupFilter} from "../pipes/match-filter";
import {TournamentService} from "../providers/tournament-service";
import {AdMobFree} from "@ionic-native/admob-free";
import {ScoreService} from "../providers/score-service";
import {StandingsService} from "../providers/standings-service";
import {LeaguePage} from "../pages/league/league";
import {Clipboard} from "@ionic-native/clipboard";
import {AccountService} from "../providers/account-service";
import {Keyboard} from "ionic-native";
import {WheelSelector} from "@ionic-native/wheel-selector";
import {IonicStorageModule} from "@ionic/storage";
import {ResetPasswordPage} from "../pages/resetpassword/resetpassword";
import {PredictionSummaryPage} from "../pages/predictionsummary/prediction-summary";
import {Rules} from "../components/rules/rules";
import {Scoring} from "../components/scoring/scoring";
import {ScrollCatcherDirective} from "../directive/scroll-catcher-directive";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {DataProvider} from "../providers/data-provider";
import * as moment from 'moment';
import {LeagueTable} from "../components/league-table/league-table";
import {Results} from "../components/results/results";
import {InAppPurchase} from "@ionic-native/in-app-purchase";
import {AdService} from "../providers/ad-service";
import {NotificationService} from "../providers/notification-service";
import {MatchPage} from "../pages/match/match";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {ProgressBar} from "../components/progress-bar/progress-bar";
import {MatchStats} from "../components/match-stats/match-stats";
import {MatchStat} from "../components/match-stat/match-stat";
import {MatchPredictionSummary} from "../components/match-prediction-summary/match-prediction-summary";
import {Lineup} from "../components/lineup/lineup";
import {MatchEvents} from "../components/match-events/match-events";
import {Commentary} from "../components/commentary/commentary";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PredictorPage,
    TournamentPage,
    AccountPage,
    StandingsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    GroupPopover,
    GroupFilter,
    ResetPasswordPage,
    LeaguePage,
    PredictionSummaryPage,
    Rules,
    Scoring,
    ScrollCatcherDirective,
    LeagueTable,
    Results,
    MatchPage,
    ProgressBar,
    MatchStats,
    MatchStat,
    MatchPredictionSummary,
    Lineup,
    MatchEvents,
    Commentary
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StandingsPage,
    PredictorPage,
    TournamentPage,
    AccountPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    GroupPopover,
    ResetPasswordPage,
    LeaguePage,
    PredictionSummaryPage,
    MatchPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MatchService,
    TournamentService,
    ScoreService,
    StandingsService,
    AdMobFree,
    AccountService,
    Clipboard,
    Keyboard,
    WheelSelector,
    LocalNotifications,
    DataProvider,
    { provide: 'moment', useValue: moment },
    InAppPurchase,
    AdService,
    NotificationService,
    FirebaseAnalytics
  ]
})
export class AppModule {}
