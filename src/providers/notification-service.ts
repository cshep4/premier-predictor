import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {DataProvider} from "./data-provider";

@Injectable()
export class NotificationService {
  constructor(private storage: Storage,
              private localNotifications: LocalNotifications,
              private dataProvider: DataProvider) {}

  async createNotifications(upcomingMatches) {
    await this.storage.keys().then( async (keys) => {
      if (keys.indexOf("notify") <= -1) {
        await this.storage.set("notify", "true");
      }
    });

    this.storage.get("notify").then((isNotified) => {
      if (isNotified !== "false") {
        this.scheduleNotifications(upcomingMatches);
      }
    }, (err) => {
      this.storage.set("notify", "true");
    });
  }

  private scheduleNotifications(upcomingMatches) {
    for(let i=0; i<upcomingMatches.length; i++) {
      for (let j = 0; j < upcomingMatches[i].matches.length; j++) {
        if (upcomingMatches[i].matches[j].hteam && upcomingMatches[i].matches[j].ateam) {
          let d = new Date(upcomingMatches[i].matches[j].dateTime);
          d.setHours(d.getHours() - 1);

          const hTeam = upcomingMatches[i].matches[j].hteam;
          const aTeam = upcomingMatches[i].matches[j].ateam;

          const id = upcomingMatches[i].matches[j].id;
          const title = hTeam + " vs " + aTeam + " - One hour to go!";
          const text = "Make sure you've got your prediction in!";
          const data = upcomingMatches[i].matches[j];
          this.localNotifications.schedule({
            id: id,
            title: title,
            text: text,
            trigger: {at: d},
            data: { match : data }
          });
        }
      }
    }
  }

  onNotificationClick(navCtrl) {
    this.localNotifications.on('click').subscribe(notification => {
      let data = notification.data;
      this.goToPredictorPage(navCtrl, data.match);
    });
  }

  private goToPredictorPage(navCtrl, match?) {
    if (match) {
      this.dataProvider.week = match.week;
    }
    navCtrl.parent.select(1);
  }
}
