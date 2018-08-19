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
    const last2 = parseInt(String(rank).slice(-2));

    if (last2 >= 11 && last2 <= 13) {
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
    } else if (name === "Newcastle United") {
      return "Newcastle";
    } else if (name === "West Ham United") {
      return "West Ham";
    } else {
      return name;
    }
  }

  static toggleSection(section) {
    section.open = !section.open;
  }

  static getPointsAwarded(match) {
    let points = 0;

    if (match.hGoals == null || match.aGoals == null) {
      return points;
    }

    if (Utils.homeGoalsMatch(match)) {
      points += 1;
    }

    if (Utils.awayGoalsMatch(match)) {
      points += 1;
    }

    if (Utils.isCorrectResult(match)) {
      points += 3;
    }

    if (Utils.homeGoalsMatch(match) && Utils.awayGoalsMatch(match)) {
      points += 3;
    }

    return points;
  }

  private static homeGoalsMatch(match){
    return match.hGoals == match.hResult;
  }

  private static awayGoalsMatch(match){
    return match.aGoals == match.aResult;
  }

  private static isCorrectResult(match) {
    return (match.hGoals > match.aGoals && match.hResult > match.aResult) ||
      (match.hGoals == match.aGoals && match.hResult == match.aResult) ||
      (match.hGoals < match.aGoals && match.hResult < match.aResult)
  }
}

// export const apiUrl = 'http://localhost:8080/';
export const apiUrl = 'https://premierpredictor.herokuapp.com/';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
}
