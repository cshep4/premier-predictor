import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import Utils from "../../utils/utils";
import {ResetPasswordPage} from "../resetpassword/resetpassword";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { email:'', password:'' };
  data: any;

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private adService: AdService,
              private firebaseAnalytics: FirebaseAnalytics) {
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
          const token = this.data.headers.get('X-Auth-Token');
          await this.storage.set('token', token);
          const userId = this.data.headers.get('userId');
          await this.storage.set('userId', userId);

          this.navCtrl.insert(0,TabsPage);
          this.navCtrl.popToRoot();
      }, (err) => {
          this.loading.dismiss();
          Utils.presentToast("Error logging in", this.toastCtrl);
      });
  }

  register() {
      this.navCtrl.push(RegisterPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

}
