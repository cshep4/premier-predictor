import {Component} from '@angular/core';

import {AlertController, App, LoadingController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service";
import Utils from "../../utils/utils";
import UserUtils from "../../utils/user-utils";
import {AccountService} from "../../providers/account-service";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Storage} from "@ionic/storage";
import {InAppPurchase} from "@ionic-native/in-app-purchase";
import {AdService} from "../../providers/ad-service";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  loading: any;
  data: any;
  accountData = { id: 0, firstName: '', surname: '', email:''};
  passwordData = { id: 0, oldPassword:'', newPassword:'', confirmPassword: '' };
  isPasswordBetween6And20Characters = UserUtils.isPasswordBetween6And20Characters;
  doesPasswordContainUppercaseLetters = UserUtils.doesPasswordContainUppercaseLetters;
  doesPasswordContainLowercaseLetters = UserUtils.doesPasswordContainLowercaseLetters;
  doesPasswordContainNumbers = UserUtils.doesPasswordContainNumbers;
  doPasswordsMatch = UserUtils.doPasswordsMatch;
  isNotifications: boolean;
  detailsDropdown = {open: false};
  passwordDropdown = {open: false};

  constructor(private app: App,
              private authService: AuthService,
              private accountService: AccountService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private localNotifications: LocalNotifications,
              private iap: InAppPurchase,
              private alertCtrl: AlertController,
              private adService: AdService) {
    this.loadAccountDetails();
    this.adService.initAd();

    this.storage.get("notify").then((isNotified) => {
      this.isNotifications = isNotified === "true";
    });
  }

  loadAccountDetails() {
    this.loading = Utils.showLoader('Retrieving account details...', this.loadingCtrl);

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.accountService.retrieveAccount(userId, token).then((result) => {
          this.loading.dismiss();
          this.data = result;

          this.accountData.email = this.data.body.email;
          this.accountData.firstName = this.data.body.firstName;
          this.accountData.surname = this.data.body.surname;

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);

        }, (err) => {
          this.loading.dismiss();
          Utils.presentToast(err, this.toastCtrl);
        });
      }, (error) => {
        this.loading.dismiss();
        Utils.presentToast("Error retrieving account", this.toastCtrl);
      });
    }, (error) => {
      this.loading.dismiss();
      Utils.presentToast("Error retrieving account", this.toastCtrl);
    });
  }

  logout() {
    this.loading = Utils.showLoader('Logging out...', this.loadingCtrl);
    this.storage.clear();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    this.loading.dismiss();
  }

  updateUserDetails() {
    this.loading = Utils.showLoader('Updating details...', this.loadingCtrl);

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.accountData.id = Number(userId);

        this.accountService.updateUserDetails(this.accountData, token).then((result) => {
          this.loading.dismiss();
          this.data = result;

          Utils.presentToast("Details updated!", this.toastCtrl);

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);

        }, (err) => {
          this.loading.dismiss();
          Utils.presentToast(err, this.toastCtrl);
        });
      }, (error) => {
        this.loading.dismiss();
        Utils.presentToast("Error updating details", this.toastCtrl);
      });
    }, (error) => {
      this.loading.dismiss();
      Utils.presentToast("Error updating details", this.toastCtrl);
    });
  }

  updatePassword() {
    this.loading = Utils.showLoader('Updating password...', this.loadingCtrl);

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.passwordData.id = Number(userId);

        this.accountService.updateUserPassword(this.passwordData, token).then((result) => {
          this.loading.dismiss();
          this.data = result;

          this.passwordData = { id: 0, oldPassword:'', newPassword:'', confirmPassword: '' };

          Utils.presentToast("Password updated!", this.toastCtrl);

          let token = this.data.headers.get('X-Auth-Token');
          this.storage.set('token', token);

        }, (err) => {
          this.loading.dismiss();
          Utils.presentToast(err, this.toastCtrl);
        });
      }, (error) => {
        this.loading.dismiss();
        Utils.presentToast("Error updating password", this.toastCtrl);
      });
    }, (error) => {
      this.loading.dismiss();
      Utils.presentToast("Error updating password", this.toastCtrl);
    });
  }

  private setNotified() {
    if (this.isNotifications === true) {
      this.storage.set("notify", "true");
    } else {
      this.storage.set("notify", "false");
      this.localNotifications.cancelAll();
    }
  }

  private goAdFree() {
    this.iap
      .getProducts(['com.cshep4.premierpredictor.adFree'])
      .then((products) => {
        console.log(products);
        const product = products[0];
        this.showPurchasePrompt(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private showPurchasePrompt(product) {
      let title = 'Go Ad Free?';
      let message = "Are you sure you want to go ad free for" + product.price + "?";

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
              this.buyAdFree(product);
            }
          }
        ]
      });

      prompt.present();
  }

  private buyAdFree(product) {
    this.iap
      .buy('com.cshep4.premierpredictor.adFree')
      .then(function (data) {
        this.updateUserForAdFree(data.transactionId);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  private updateUserForAdFree(transactionId) {
    this.storage.set("adFree", "true");
    this.adService.initAd();

    this.storage.get('token').then((token) => {
      this.storage.get('userId').then((userId) => {
        this.accountService.updateUserForAdFree(userId, token, transactionId);
      });
    });
  }

  private restorePurchases() {
    this.adService.restorePurchases();
  }
}
