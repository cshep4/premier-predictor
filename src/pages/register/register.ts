import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {TabsPage} from "../tabs/tabs";
import Utils from "../../utils/utils";
import UserUtils from "../../utils/user-utils";
import {Storage} from "@ionic/storage";
import {AdService} from "../../providers/ad-service";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    loading: any;
    regData = { firstName: '', surname: '', email:'', password:'', confirmPassword: '', predictedWinner: '' };
    data: any;
    isPasswordBetween6And20Characters = UserUtils.isPasswordBetween6And20Characters;
    doesPasswordContainUppercaseLetters = UserUtils.doesPasswordContainUppercaseLetters;
    doesPasswordContainLowercaseLetters = UserUtils.doesPasswordContainLowercaseLetters;
    doesPasswordContainNumbers = UserUtils.doesPasswordContainNumbers;
    doPasswordsMatch = UserUtils.doPasswordsMatch;

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
      this.firebaseAnalytics.setCurrentScreen("Registration");
      this.firebaseAnalytics.logEvent('page_view', {page: "Registration"});
    }

    doSignup() {
        this.loading = Utils.showLoader('Registering...', this.loadingCtrl);

        this.authService.register(this.regData).then((result) => {
            const loginData = {
                email: this.regData.email,
                password: this.regData.password
            };

            this.firebaseAnalytics.logEvent('user_registration', {predictedWinner: this.regData.predictedWinner});
            this.firebaseAnalytics.setUserProperty("PredictedWinner", this.regData.predictedWinner);

            this.authService.login(loginData).then(async (result) => {
                this.loading.dismiss();

                this.data = result;
                // const token = this.data.headers.get('X-Auth-Token');
                // await this.storage.set('token', token);

                const userId = this.data.headers.get('userId');
                this.firebaseAnalytics.setUserId(userId);
                await this.storage.set('userId', userId);

                this.navCtrl.setRoot(TabsPage);
                this.navCtrl.popToRoot();

            }, (err) => {
                this.loading.dismiss();
                Utils.presentToast("Error logging in, please try again", this.toastCtrl);
            });

        }, (err) => {
            this.loading.dismiss();
            Utils.presentToast(err, this.toastCtrl);
        });
    }
}
