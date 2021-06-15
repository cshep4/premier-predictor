import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import Utils from "../../utils/utils";
import {ResetPasswordPage} from "../resetpassword/resetpassword";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {TableTeam} from "../../models/TableTeam";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = {email: '', password: ''};
  data: any;

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private adService: AdService,
              private firebaseAnalytics: FirebaseAnalytics,
              private alertCtrl: AlertController) {
    this.adService.initAd();
  }

  ionViewDidEnter() {
    this.firebaseAnalytics.setCurrentScreen("Login");
    this.firebaseAnalytics.logEvent('page_view', {page: "Login"});
  }

  doLogin() {
    this.loading = Utils.showLoader('Logging in...', this.loadingCtrl);
    this.authService.login(this.loginData).then(async (result) => {
      this.loading.dismiss();

      this.data = result;

      if (this.data.body) {
        this.doLegacyLogin();
      } else {
        const token = this.data.headers.get('X-Auth-Token');
        await this.storage.set('token', token);
        const userId = this.data.headers.get('userId');
        await this.storage.set('userId', userId);

        this.navCtrl.insert(0, TabsPage);
        this.navCtrl.popToRoot();
      }
    }, (err) => {
      this.loading.dismiss();
      Utils.presentToast("Error logging in, please try again", this.toastCtrl);
    });
  }

  private doLegacyLogin() {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle('Predict Winner');

    let isChecked = true;
    this.teams.forEach(team => {
      alert.addInput({
        type: 'radio',
        label: team,
        value: team,
        checked: isChecked
      });

      isChecked = false;
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.showLegacyUserCreationPrompt(data);
      }
    });
    alert.present();
  }

  private showLegacyUserCreationPrompt(team) {
    let message;
    let title;
    title = 'Predict ' + team + ' To Win?';
    message = "Are you sure? This cannot be changed.";

    const prompt = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: data => {
            this.storeLegacyUserAndLogin(team);
          }
        }
      ]
    });

    prompt.present();
  }

  private storeLegacyUserAndLogin(team) {
    this.loading = Utils.showLoader('Updating predicted winner...', this.loadingCtrl);

    let user = this.data.body;
    user.predictedWinner = team;

    this.authService.storeLegacyUser(user).then(async (result) => {
      this.loading.dismiss();
      this.doLogin();
    }, (err) => {
      this.loading.dismiss();
      Utils.presentToast("Error logging in, please try again", this.toastCtrl);
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  private teams = [
    "AFC Bournemouth",
    "Arsenal",
    "Aston Villa",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Leicester City",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Norwich City",
    "Sheffield United",
    "Southampton",
    "Tottenham Hotspur",
    "Watford",
    "West Ham United",
    "Wolverhampton Wanderers"
  ];

}
