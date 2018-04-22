import {HttpHeaders} from "@angular/common/http";

export default class Utils {
  static showLoader(message, loadingCtrl) {
    let loading = loadingCtrl.create({
      content: message
    });

    loading.present();

    return loading;
  }

  static presentToast(msg, toastCtrl) {
    let toast = toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

export const apiUrl = 'https://wcpredictor.herokuapp.com/';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
}
