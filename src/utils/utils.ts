import {HttpHeaders} from "@angular/common/http";

export default class Utils {
  static refreshLeagues = false;

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

  static getRankWithSuffix(rank) {
    return rank + this.getSuffix(rank)
  }

  private static getSuffix(rank) {
    if (rank >= 11 && rank <= 13) {
      return "th"
    }

    let i = rank % 10;

    switch(i) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th"
    }
  }

  static compareLeague(a, b) {
    if (a.pin < b.pin)
      return -1;
    if (a.pin > b.pin)
      return 1;
    return 0;
  }

  static dismissLoaders(loading, refresher?) {
    if (!refresher) {
      loading.dismiss();
    } else {
      refresher.complete();
    }
  }

  static getTeamName(name) {
    if (name === "Wolverhampton Wanderers") {
      return "Wolves";
    } else if (name === "Brighton & Hove Albion") {
      return "Brighton";
    } else if (name === "Tottenham Hotspur") {
      return "Tottenham";
    } else if (name === "AFC Bournemouth") {
      return "Bournemouth";
    } else if (name === "Huddersfield Town") {
      return "Huddersfield";
    } else if (name === "Manchester United") {
      return "Man United";
    } else if (name === "Manchester City") {
      return "Man City";
    } else {
      return name;
    }
  }
}

// export const apiUrl = 'http://localhost:8080/';
export const apiUrl = 'https://premierpredictor.herokuapp.com/';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
}
