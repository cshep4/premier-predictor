import {Injectable} from "@angular/core";
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {Platform} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {AccountService} from "./account-service";
import {InAppPurchase} from "@ionic-native/in-app-purchase";

@Injectable()
export class AdService {
  constructor (private plt: Platform,
               private admob: AdMobFree,
               private storage: Storage,
               private accountService: AccountService,
               private iap: InAppPurchase) {}

  initAd() {
    this.isNotAdFree().then((data) => {
      this.showBanner();
      console.log(data);
    }).catch((err) => {
      this.admob.banner.remove().then(() => {
        console.log("hidden");
      }).catch((err) => {
        console.log(err);
      });
      console.log("don't display ads");
    });
  }

  private showBanner() {
    let id;
    let atTop;
    if (this.plt.is('ios')) {
      id = 'ca-app-pub-8783352058311313/6962955258';
      atTop = false;
    } else {
      id = 'ca-app-pub-8783352058311313/7098670716';
      atTop = true;
    }

    let bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      id: id,
      bannerAtTop: atTop
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));
  }

  private isNotAdFree() {
    return new Promise( (resolve, reject) => {
        this.checkAdSetting().then( (data) => {
            console.log(data);

            this.shouldNotBeAdFree(reject, resolve);
        }).catch((err) => {
            console.log(err);

            this.addAdSetting().then((result) => {
                this.shouldNotBeAdFree(reject, resolve);
            }).catch((err) => {
                resolve(err);
            });
        });
    });
  }

  private shouldNotBeAdFree(reject, resolve) {
    this.storage.get("adFree").then((data) => {
      if (data == "true") {
        reject("Ad free");
      } else {
        resolve("Not ad free");
      }
    }).catch((err) => {
      console.log(err);
      resolve(err);
    });
  }

  private checkAdSetting() {
    return new Promise((resolve, reject) => {
      this.storage.keys().then( (keys) => {
        if (keys.indexOf("adFree") <= -1) {
          reject("Key doesn't exist");
        } else {
          resolve("Key exists");
        }
      });
    });
  }

  private addAdSetting() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        if (!token) {
          this.restorePurchases().then((data) => {
            resolve("setting added");
          }).catch((err) => {
            reject(err);
          });
        }

        this.storage.get('userId').then((userId) => {
          this.accountService.retrieveAccount(userId, token).then((result) => {
            const data: any = result;
            const adFree = data.body.adFree;

            if (adFree) {
              this.storage.set("adFree", "true");
            } else {
              this.storage.set("adFree", "false");
            }

            // let token = data.headers.get('X-Auth-Token');
            // this.storage.set('token', token);

            resolve("setting added");

          }, (err) => {
            reject(err);
          });
        }, (error) => {
          reject(error);
        });
      }, (error) => {
        this.restorePurchases().then((data) => {
          resolve("setting added");
        }).catch((err) => {
          reject(err);
        });
      });
    });
  }

  restorePurchases() {
    return new Promise((resolve, reject) => {
      this.iap.restorePurchases().then(function (data) {
        console.log(data);

        if (data.filter(it => it.productId == 'com.cshep4.premierpredictor.adFree').length != 0) {
          this.storage.set("adFree", "true");
          resolve(data);
        } else {
          this.storage.set("adFree", "false");
          reject(data);
        }

      })
      .catch(function (err) {
          console.log(err);
          reject(err);
      });
    });
  }
}
